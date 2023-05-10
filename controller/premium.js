const User = require ('../models/user');
const UserExpense = require('../models/expense');
const S3Services = require('../services/s3services');
const express = require('express')
const AWS = require('aws-sdk');;
const FileDb = require('../models/downloads');


async function getAllUsersWithExpenses(req, res) {
  try{  
    const users = await User.find({}, {
      name: 1,
      totalExpense: 1,
      _id: 0
    }).sort({ totalExpense: -1 });
    res.status(200).json(users)

  }catch (err){
    console.log(err)
  }
}




async function download(req, res, next) {
  try {
    const userId = req.user.id;
    const expenses = await UserExpense.find({ userId: userId });
    const strExpenses = JSON.stringify(expenses);
    const filename = `Expense${userId}/${new Date()}.txt`;
    const fileURL = await S3Services.uploadToS3(strExpenses, filename);
    const link = await FileDb.create({
      fileURL: fileURL,
      userId: userId
    });
    res.status(201).json({ fileURL, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

async function downloadFile(req, res, next) {
  try {
    const userId = req.user.id;
    // console.log(user)
    const links = await FileDb.find({ userId: userId });
    // console.log(links)
    res.json(links);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}


  module.exports = { getAllUsersWithExpenses, download, downloadFile};
  
  
  
  
  
  
  