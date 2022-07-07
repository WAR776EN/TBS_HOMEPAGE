const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    req: [true, 'email is required'],
    unique: [true],
    lowercase: true
  },
  password: {
    type: String,
    req: true,
    minlength: [6, 'password is at least 6 characters']
  },
  name: {
    type: String,
    req: [true, 'name is required'],
    lowecase: true
  },
  type: {
    type: String,
    default: 'public',
    enum:['public', 'verified']
  }
}, {
    timestamps: true
});

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('User', UserSchema)