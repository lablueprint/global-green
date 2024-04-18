import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    userName: { type: String },
    profilePic: { type: String },
    rank: { type: Number },
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

  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
