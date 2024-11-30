import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
      trim: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    companyLogo: {
      type: String,
      required: true,
      trim: true
    },
    logoBG: {
      type: String,
      default: '#FFFFFF',
      trim: true
    },
    workingPeriod: {
      type: String,
      required: true,
      trim: true
    },
    points: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: 'At least one point required!'
      }
    }
  },
  { timestamps: true }
);

const Experience = mongoose.model('Experience', ExperienceSchema);

export default Experience;
