import Skill from '../models/skill.model.js';

// endpoint function to get all skills
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res
      .status(200)
      .json({ success: true, message: 'Request successful!', data: skills });
  } catch (error) {
    console.log('Error getting all skills: ', error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};

// endpoint function to create new skill
export const addSkill = async (req, res) => {
  const { name, img } = req.body;

  try {
    if (!name || !img) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required!' });
    }

    if (typeof name !== 'string') {
      return res
        .status(400)
        .json({ success: false, message: 'Name must be string!' });
    }
    if (typeof img !== 'string') {
      return res
        .status(400)
        .json({ success: false, message: 'Image must be string!' });
    }

    const skillAlreadyExists = await Skill.findOne({ name });
    if (skillAlreadyExists) {
      return res
        .status(409)
        .json({ success: false, message: 'Skill already exists!' });
    }

    const skill = new Skill({ name, img });
    await skill.save();
    res.status(201).json({
      success: true,
      message: `${name} added to your skills!`,
      data: skill
    });
  } catch (error) {
    console.log('Error adding new skill: ', error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};

// endpoint function to delete a skill
export const deleteSkill = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSkill = await Skill.findByIdAndDelete(id);
    console.log(deletedSkill)

    if (!deletedSkill) {
      return res
        .status(404)
        .json({ success: false, message: 'Skill not found!' });
    }

    res
      .status(200)
      .json({
        success: true,
        message: 'Skill deleted successfully!',
        data: deletedSkill
      });
  } catch (error) {
    console.log('Error deleting skill: ', error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};
