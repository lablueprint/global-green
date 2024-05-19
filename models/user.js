import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    userName: { type: String },
    points: { type: Number, default: 0 },
    badges: { type: Array },
    courses: [
      {
        key: { type: String, required: true },
        currStage: { type: Number },
        complete: { type: Boolean },
      },
    ],
    verified: { type: Boolean, default: false },
    verifyToken: { type: String },
    verifyExpires: { type: Date, default: Date.now, index: { expireAfterSeconds: 300 } },
    accessories: { type: [String] },
    backgrounds: { type: [String], default: 'background1' },
    garden: {
      background: { type: String, default: 'background1' },
      accessories: { type: [String] },
    },
    seeds: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
