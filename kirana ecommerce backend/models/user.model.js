const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  
  password: { type: String, required: true }
}, { timestamps: true });  // fixed 'timestamp' to 'timestamps'

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
