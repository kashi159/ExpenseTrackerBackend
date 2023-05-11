const UserExpense = require('../models/expense');
const User = require('../models/user');
const ForgotPasswordRequests = require('../models/ForgotPasswordRequests')


exports.getResetLink = async (req, res, next) => {
    const resetId = req.params.id;
    try {
      const resetRequest = await ForgotPasswordRequests.findOne({
        id: resetId,
        isActive: true,
      });
      if (!resetRequest) {
        return res
          .status(400)
          .json({ error: 'Link expired, please reset again' });
      }
      res.status(200).send(`<html>
          <script>
              function formsubmitted(e){
                  e.preventDefault();
                  console.log('called')
              }
          </script>
          <body>
          <form action="/password/updatepassword/${resetId}" method="get">
              <label for="newpassword">Enter New password</label>
              <input name="newpassword" type="password" required></input>
              <button>reset password</button>
          </form>
          </body>
      </html>`);
      res.end();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Server error' });
    }
  };