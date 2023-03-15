const UserExpense = require('../models/expense');
const User = require('../models/user');
const ForgotPasswordRequests = require('../models/ForgotPasswordRequests')
const sequelize = require('../util/userDatabase');

exports.getResetLink = async (req, res, next)=> {
    const prodId = req.params.id;
    try{
        const user = await ForgotPasswordRequests.findOne({
            where: {
            id: prodId,
            isActive: true
            }
        })
        if(!user){
            return res.status(400).json({ error: 'Link expired, please reset again' });
        }
        res.status(200).send(`<html>
        <script>
            function formsubmitted(e){
                e.preventDefault();
                console.log('called')
            }
        </script>
        <body>
        <form action="/password/updatepassword/${prodId}" method="get">
            <label for="newpassword">Enter New password</label>
            <input name="newpassword" type="password" required></input>
            <button>reset password</button>
        </form>
        </body>
    </html>`
    )
        res.end()
        

    }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Server error' });
    }
   
}