import { User } from "../models/user.js";
import { Cart } from "../models/cart.js";

const getAllUsers = async (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        message: "All users fetched successfully",
        allUser: users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error fetching users",
        error: err,
      });
    });
};

const registerAsSeller = async (req, res) => {
  try {
    // Validate input data
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Create the user with role 'Seller'
    const userToAdd = new User({
      ...req.body,
      role: "Seller",
    });

    // Save user and create a cart in a transaction (if possible in your database setup)
    const user = await userToAdd.save();

    // Create an empty cart for the user
    const cart = await Cart.create({
      userId: user._id,
      items: [],
      totalPrice: 0,
      createdAt: new Date(),
    });

    // Respond with a success message
    return res.status(200).json({
      message: "User added as seller successfully",
      user,
      cart,
    });
  } catch (err) {
    // Log the error (optional) and respond with an error status
    console.error(err);
    return res.status(500).json({
      error: "An error occurred while registering the user as a seller",
    });
  }
};

const registerAsBuyer = async (req, res) => {
  try {
    // Validate input data
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Create the user with role 'Seller'
    const userToAdd = new User({
      ...req.body,
      role: "Buyer",
    });

    // Save user and create a cart in a transaction (if possible in your database setup)
    const user = await userToAdd.save();

    // Create an empty cart for the user
    const cart = await Cart.create({
      userId: user._id,
      items: [],
      totalPrice: 0,
      createdAt: new Date(),
    });

    // Respond with a success message
    return res.status(200).json({
      message: "User added as seller successfully",
      user,
      cart,
    });
  } catch (err) {
    // Log the error (optional) and respond with an error status
    console.error(err);
    return res.status(500).json({
      error: "An error occurred while registering the user as a seller",
    });
  }
};

const login = async (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (user.password === req.body.password) {
          res.status(200).json({
            message: "Login successful",
            userExist: true,
            correctPassword: true,
            userRole: user.role,
            user_id: user._id,
            user_name: `${user.firstName} ${user.lastName}`,
          });
        } else {
          res.status(200).json({
            message: "Wrong password",
            userExist: true,
            correctPassword: false,
          });
        }
      } else {
        res.status(200).json({
          message: "User does not exist",
          userExist: false,
          correctPassword: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
const getuserById = async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "User fetched by ID successfully",
          user,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const uploadUserProfile = async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        user.profilePhoto = req.body.profilePhoto;
        return user.save();
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .then((user) => {
      res.status(200).json({
        message: "Successfully added profile pic",
        user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const editUser = async (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "User info edited successfully",
          userInfo: user,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const getUserProfile = async (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "Fetched profile pic successfully",
          profilePic: user.profilePhoto,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const delteUserById = async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "User deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

export {
  getAllUsers,
  registerAsBuyer,
  registerAsSeller,
  login,
  getuserById,
  uploadUserProfile,
  editUser,
  getUserProfile,
  delteUserById,
};
