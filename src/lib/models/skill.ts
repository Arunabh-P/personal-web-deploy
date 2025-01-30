import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  index: { type: String, required: true },
  title: { type: String, required: true, minlength: 3, maxlength: 20 },
  description: { type: String, required: true, minlength: 100, maxlength: 180 },
});

const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);

export default Skill;
