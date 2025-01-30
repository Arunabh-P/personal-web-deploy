import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  company: { type: String, optional: true },
  quote: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model('Testimonial', TestimonialSchema);

export default Testimonial;
