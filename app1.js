const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());


const signUpRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const forgetPassword = require('./routes/forgetPassword');
const passwordReset = require('./routes/resetlink');


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

mongoose
.connect('mongodb+srv://kashif15:Kashif%40125@cluster0.e6trsdy.mongodb.net/expenseTracker?retryWrites=true&w=majority')
.then(result => {
  console.log("Connected!")
  app.listen(4000);
})
.catch(err =>{
  console.log(err)
});




