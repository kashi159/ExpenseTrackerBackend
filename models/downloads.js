const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const downloadFileSchema = new Schema({
  fileURL: {
    type: String,
    required: true
  },
  userId:{
    type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model('DownloadFile', downloadFileSchema);
