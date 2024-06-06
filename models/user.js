import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    userName: { type: String },
    badges: { type: Array },
    courses: [
      {
        key: { type: String, required: true },
        currStage: { type: Number },
        complete: { type: Boolean },
      },
    ],
    certificates: [
      {
        key: { type: String, required: true },
        date: { type: Date },
      },
    ],
    verified: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyExpires: { type: Date, default: Date.now, index: { expireAfterSeconds: 300 } },
    forgetPasswordToken: { type: String },
    forgetPasswordExpires: { type: Date },
    accessories: { type: [String], default: [] },
    backgrounds: { type: [String], default: [] },
    garden: {
      background: { type: String, default: 'background1' },
      accessories: { type: [String] },
    },
    seeds: { type: Number, default: 0 },
    profilePic: { type: String },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
