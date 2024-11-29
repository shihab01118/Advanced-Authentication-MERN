import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    img: {
      type: String,
      trim: true
    },
    review: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
