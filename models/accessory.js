import mongoose, { Schema } from 'mongoose';

/**
 * accessories have a name, price, and image
 */

const accessorySchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true,
});

const Accessory = mongoose.models.Accessory || mongoose.model('Accessory', accessorySchema);

export default Accessory;
