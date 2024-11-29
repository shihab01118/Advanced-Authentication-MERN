import Review from '../models/review.model.js';

// endpoint function to get all reviews
export const getAllReviews = async (req, res) => {
  console.log("hello from reviews");
  try {
    const allReviews = await Review.find();
    res.status(200).json({
      success: true,
      message: 'Request successful!',
      data: allReviews
    });
  } catch (error) {
    console.log('Error getting reviews: ', error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};

// endpoint funtion to add a review
export const addReview = async (req, res) => {
  const { name, position, img, review } = req.body;

  try {
    if (!name || !position || !review) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required!' });
    }

    const newReview = new Review({ name, position, img, review });
    await newReview.save();
    res.status(201).json({
      success: true,
      message: 'Review added successfully!',
      data: newReview
    });
  } catch (error) {
    console.log('Error adding new review: ', error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};

// endpoint funtion to delete a review
export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res
        .status(404)
        .json({ success: false, message: 'Review not found!' });
    }

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully!',
      data: deletedReview
    });
  } catch (error) {
    console.log('Error deleting review: ', error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};
