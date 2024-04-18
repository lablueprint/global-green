import mongoose, { Schema } from 'mongoose';

/**
 * backgrounds have a name, price, and image
  */
const backgroundSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

const Background = mongoose.models.Background || mongoose.model('Background', backgroundSchema);

export default Background;
