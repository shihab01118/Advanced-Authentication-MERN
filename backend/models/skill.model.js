import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    img: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', SkillSchema);

export default Skill;
