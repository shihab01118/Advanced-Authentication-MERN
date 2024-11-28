import NavItem from '../models/navItem.model.js';

// endpoint function to create a nav item
export const createNavItem = async (req, res) => {
  try {
    const { label, link, isActive, order } = req.body;
    if (!label || !link) {
      return res
        .status(400)
        .json({ success: false, message: 'Label and link are required!' });
    }

    const itemAlreadyExists =
      (await NavItem.findOne({ label })) || (await NavItem.findOne({ link }));
    if (itemAlreadyExists) {
      return res
        .status(409)
        .json({ success: false, message: 'Label already exists!' });
    }

    const newOrder = order ?? (await NavItem.countDocuments()) + 1;

    const navItem = new NavItem({
      label,
      link,
      isActive,
      order: newOrder
    });
    await navItem.save();
    res
      .status(201)
      .json({ success: true, message: 'Nav item created!', navItem });
  } catch (error) {
    console.log('Error in create nav item: ', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
