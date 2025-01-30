import mongoose from 'mongoose';

const SoftwareSkillSchema = new mongoose.Schema({
  index: { type: Number, required: true },
  icon: { type: String, required: true },
  altText: { type: String, required: true },
  code: { type: String, required: true },
});

const SoftwareSkill =
  mongoose.models.SoftwareSkill ||
  mongoose.model('SoftwareSkill', SoftwareSkillSchema);

export default SoftwareSkill;
