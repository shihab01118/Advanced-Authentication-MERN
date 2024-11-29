import Skill from '../models/skill.model.js';

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
