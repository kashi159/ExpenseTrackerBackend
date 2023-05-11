const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasswordResetSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
      },
    id: {
        type: String,
        required: true,
      },
    isActive: {
        type: Boolean,
        default: true,
  },
});

module.exports = mongoose.model('PasswordReset', PasswordResetSchema);

