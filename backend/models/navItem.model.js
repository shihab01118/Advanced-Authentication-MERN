import mongoose from 'mongoose';

const NavItemSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    link: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number
    }
  },
  { timestamps: true }
);

const NavItem = mongoose.model('NavItem', NavItemSchema);

export default NavItem;
