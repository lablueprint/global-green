import mongoose, { Schema } from 'mongoose';

/**
 * Lessons have a title, texts, indexes, and images
 */

const lessonSchema = new Schema({
  key: { type: String, required: true },
  label: { type: String, required: true },
  parts: [{
    type: { type: String, required: true, enum: ['Title', 'Text', 'Image', 'Index'] },
    value: { required: true },
  }],
}, {
  timestamps: true,
});

const Lesson = mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);

export default Lesson;
