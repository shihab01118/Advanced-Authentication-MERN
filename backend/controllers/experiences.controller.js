import Experience from '../models/experience.model.js';

// endpoint function to get all experiences
export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    await res.status(200).json({
      success: true,
      message: 'Request successful!',
      data: experiences
    });
  } catch (error) {
    console.log('Error getting experiences: ', error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};

// endpoint function to add a experience
export const addExperience = async (req, res) => {
  const { position, companyName, companyLogo, workingPeriod, points } =
    req.body;

  try {
    if (
      !position ||
      !companyName ||
      !companyLogo ||
      !workingPeriod ||
      points.length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required!' });
    }

    const experience = new Experience({
      position,
      companyName,
      companyLogo,
      workingPeriod,
      points
    });
    await experience.save();
    res.status(201).json({
      success: true,
      message: 'Experience added successfully!',
      data: experience
    });
  } catch (error) {
    console.log('Error adding experience: ', error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};

export const deleteExperience = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExperience = await Experience.findByIdAndDelete(id);

    if (!deletedExperience) {
      return res
        .status(404)
        .json({ success: false, message: 'Experience not found!' });
    }

    res
      .status(200)
      .json({
        success: true,
        message: 'Experience deleted successfully!',
        data: deletedExperience
      });
  } catch (error) {
    console.log('Error deleting experience: ', error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};
