import mongoose, { Schema } from 'mongoose';

const markerSchema = new Schema(
  {
    markername: String,
    longlat: [Number, Number],
    description: String,
    tag: String,
    link: String,
  },
  {
    timestamps: true,
  },
);

const Marker = mongoose.models.Marker || mongoose.model('Marker', markerSchema);

export default Marker;
