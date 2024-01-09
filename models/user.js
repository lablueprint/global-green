import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: String,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.topic || mongoose.model('User', userSchema);

export default User;
