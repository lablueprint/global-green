import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    userName: { type: String },
    rank: { type: Number },
    badges: { type: Array },
    courses: [
      {
        key: { type: String, required: true },
        currStage: { type: Number },
      },
    ],
    verified: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyExpires: { type: Date, default: Date.now, index: { expireAfterSeconds: 300 } },
    accessories: { type: [String] },
    backgrounds: { type: [String] },
    garden: {
      background: { type: String },
      accessories: { type: [String] },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
