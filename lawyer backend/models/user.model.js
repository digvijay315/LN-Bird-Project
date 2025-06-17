const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String,  },
  email: { type: String, },
  username: { type: String,  },
  password: { type: String, },
  // confirmPassword is typically NOT stored in DB, so it's excluded here
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
