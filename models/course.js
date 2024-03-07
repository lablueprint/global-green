import mongoose, { Schema } from 'mongoose';

/**
 * A course is the highest level of abstraction. We currently have 6 total courses.
 * Each course has 5 stages (lesson + quiz), and one final quiz.
 * Some courses require you finish a certain number of previous courses.
 */

const courseSchema = new Schema({
  key: { type: String, required: true },
  label: { type: String, required: true },
  requirements: { type: Number, required: true },
  stages: [{
    key: { type: String, required: true },
    type: { type: String, required: true, enum: ['Lesson', 'Quiz'] },
  }],
}, {
  timestamps: true,
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;
