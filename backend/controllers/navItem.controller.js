import NavItem from '../models/navItem.model.js';

// endpoint function to get all nav items
export const getAllNavItems = async (req, res) => {
  try {
    const navItems = await NavItem.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: navItems });
  } catch (error) {
    console.log('Error in get all nav items', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// endpoint function to create a nav item
export const createNavItem = async (req, res) => {
  try {
    const { label, link, isActive, order } = req.body;
    if (!label || !link) {
      return res
        .status(400)
        .json({ success: false, message: 'Label and link are required!' });
    }

    const itemAlreadyExists = await NavItem.findOne({
      $or: [{ label }, { link }]
    });
    if (itemAlreadyExists) {
      return res
        .status(409)
        .json({ success: false, message: 'Label or link already exists!' });
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

// endpoint function to delete a nav item
export const deleteNavItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await NavItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res
        .status(404)
        .json({ success: false, message: 'Nav Item not found!' });
    }

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully!',
      data: deletedItem
    });
  } catch (error) {
    console.log('Error deleting nav item: ', error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};
