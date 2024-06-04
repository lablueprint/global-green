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
    verified: { type: Boolean },
    verifyToken: { type: String },
    forgetPasswordToken: { type: String },
    forgetPasswordExpires: { type: Date },
    verifyExpires: { type: Date, index: { expireAfterSeconds: 300 } },
    accessories: { type: Array, default: [] },
    backgrounds: { type: Array, default: [] },
    seeds: { type: Number, default: 0 },
    profilePic: { type: String },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
