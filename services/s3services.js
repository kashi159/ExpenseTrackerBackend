const AWS = require('aws-sdk');
require('dotenv').config();

const uploadToS3= (data, filename)=> {
    const BUCKET_NAME = 'expensetrackerapp159';
    const IAM_USER_KEY =  process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
  
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET
    });
  
    return new Promise((resolve, reject) => {
      var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
      };
      s3bucket.upload(params, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.Location);
        }
      });
    });
  }

  module.exports = {
    uploadToS3
  }