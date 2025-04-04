const { ROLES } = require("../config/constants");
const User = require("../models/userModel");
const { generateJwtToken } = require("../utils/jwtUtils");
const bcrypt = require("bcrypt");

exports.registerUserService = async ({ name, email, password, role }) => {
  if (!name || !email || !password || !role) {
    throw new Error("All fields must be filled.");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("User with this Email Already Exists.");
    error.statusCode = 404;
    throw error;
  }

  if (password.length < 6) {
    const error = new Error("Password must be greater than 6 characters");
    error.message = "Password must be greater than 6 characters";
    error.statusCode = 404;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
    isActive: true,
  });
  await user.save();
  const token = generateJwtToken(user);

  return { user, token };
};

// exports.registerOwnerService = async ({name,businessName, email, password }) => {
//     if (!name || !email || !password || !businessName) {
//         throw new Error("All fields must be filled.")
//     }
//         const existingOwner = await User.findOne({ email });
//         if (existingOwner) {
//             throw new Error("User with this Email Already Exists.")
//         }

//         if (password.length < 6) {
//             throw new Error("Password must be greater than 6 characters");
//         }

//             const hashedPassword = await bcrypt.hash(password, 10);
//             const owner = new User({ name, email, password:hashedPassword, businessName, role: ROLES.BUSINESSOWNER, isActive: true });
//             await owner.save();
//             const token = generateJwtToken(owner);

//     return { owner, token };
// };

exports.loginUserService = async ({ email, password }) => {
  let user = await User.findOne({ email });

  if (!user) {
    throw new Error("User Not Found with this email", 401);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error(
      "Sorry, looks like that’s the wrong email or password.",
      401
    );
  }

  const token = generateJwtToken(user);

  return { user, token };
};
