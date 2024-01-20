import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  }
}, {
  timestamps: true,
});

const User = model('User', userSchema);
export default User;