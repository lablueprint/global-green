import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    rank: { type: Number },
    badges: { type: Array },
    courses: { type: Array },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
