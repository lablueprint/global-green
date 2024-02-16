import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String },
    rank: { type: Number },
    badges: { type: Array },
    courses: { type: Array },
    verified: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyExpires: { type: Date, default: Date.now, index: { expireAfterSeconds: 300 } },

  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
