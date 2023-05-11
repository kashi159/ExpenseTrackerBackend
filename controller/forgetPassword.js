const User = require('../models/user');
const Sib = require('sib-api-v3-sdk');
const ForgotPasswordRequests= require('../models/ForgotPasswordRequests');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;

const sender = {
    email: 'kashifzafar15@gmail.com',
    name: 'Expense Tracker App'
}

exports.postForgetPassword = async (req, res, next) => {
    const email = req.body.email;
    // console.log(email);
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(409).json({ error: "User does not exists" });
        } else {
            const reset = new ForgotPasswordRequests({ isActive: true, userId: user._id, id: uuidv4() });
            await reset.save();
            const tranEmailAPi = new Sib.TransactionalEmailsApi()
            const recievers = [{
                email: email
            }]
            const response = await tranEmailAPi.sendTransacEmail({
                sender,
                to: recievers,
                subject: 'Password Reset Link',
                textContent: `Please click on the link to reset your password.
                if note done by you please change your password.`,
                htmlContent: `<p>Please click on the link to reset your password.
                if note done by you please change your password.</p>
                <a href="http://localhost:4000/password/resetpassword/${reset.id}">Reset link</a>`
            });
            // console.log(response);
            return res.status(200).json(response);
        }
    } catch(err) {
        console.error(err);
        return res.status(409).json({ error: "User does not exists" });
    };
}


exports.getUpdatePassword = async (req, res, next) => {
    try {
      const id = req.params.id;
      const newpassword = req.query.newpassword;
  
      const result = await ForgotPasswordRequests.findOne({ id: id });
      const user = await User.findOne({ _id: result.userId });
  
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          console.log(err);
          throw new Error(err);
        }
        bcrypt.hash(newpassword, salt, function (err, hash) {
          if (err) {
            console.log(err);
            throw new Error(err);
          }
          user.password = hash;
          user.save().then(() => {
            res.status(201).json({ message: 'Successfully updated the new password' });
            result.isActive = false;
            result.save();
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  };