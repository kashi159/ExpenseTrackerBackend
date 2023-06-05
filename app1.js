const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const sequelize = require('./util/userDatabase')
var cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan')
require('dotenv').config();

const app = express();
app.use(cors());


const signUpRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const forgetPassword = require('./routes/forgetPassword');
const passwordReset = require('./routes/resetlink');
const User = require('./models/user');
const UserExpense = require('./models/expense');
const Order = require('./models/order');
const DownloadLink = require('./models/downloads')
const ForgotPasswordRequests = require('./models/ForgotPasswordRequests')

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// app.use(helmet());
// app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.json({ extended: false }));

app.use(signUpRoutes);
app.use(loginRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);
app.use(forgetPassword);
app.use(passwordReset);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, `Public/${req.url}`))
})

User.hasMany(UserExpense);
UserExpense.belongsTo(User)

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(User);

User.hasMany(DownloadLink)
DownloadLink.belongsTo(User)

console.log(process.env.NODE_ENV)

sequelize
// .sync({force: true})
.sync()
.then(result =>{
    // console.log(result);
    app.listen(process.env.PORT || 4000);
})
.catch(err =>{
    console.log(err);
});

async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
 authenticate();