const {
  registerUserService,
  loginUserService
} = require("../services/authService");
const { errorResponse, successResponse } = require("../utils/responseUtils");

exports.signupUser = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    const result = await registerUserService({ email, password, name, role });
    res.status(200).json(successResponse(result, "Signup successful"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginUserService({ email, password });
    res.status(200).json(successResponse(result, "Login successful"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

// exports.signupOwnerController = async (req, res) => {
//     const { email, password, name, businessName } = req.body;

//     try {
//         const result = await registerOwnerService({ email, password, name, businessName });
//         res.status(200).json(successResponse(result, 'Login successful'));
//     } catch (error) {
//         res.status(500).json(errorResponse(error.message || 'Internal server error'));
//     }
// };
