import mongoose, { Schema } from 'mongoose';

const markerSchema = new Schema(
  {
    name: { type: String, required: true },
    longlat: { type: [Number, Number], required: true },
    description: { type: String, required: true },
    tag: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Marker = mongoose.models.Marker || mongoose.model('Marker', markerSchema);

export default Marker;
