import mongoose, { Schema } from 'mongoose';

const challengesSchema = new Schema(
  {
    challengeTitle: { type: String, required: true },
    denominator: { type: Number, required: true },
    pointsToEarn: { type: Number, required: true },
    icon: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Challenge = mongoose.models.Challenges || mongoose.model('Challenges', challengesSchema);

export default Challenge;
