const mongoose = require("mongoose");
const { ROLES } = require("../config/constants");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

/**
 * User Schema
 */
const userSchema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, sparse: true },
    phone: { type: String, sparse: true },
    password: { type: String },
    about: { type: String },
    role: { type: String, enum: Object.values(ROLES), required: true },
    location: { type: String },
    businessName: { type: String },
    businessAddress: { type: String },
    isActive: { type: Boolean, default: false },
    location: { type: String },
    upi_id:{ type: String},
    profileImage: { type: String },
  },
  { timestamps: true, versionKey: false }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Error while comparing passwords");
  }
};

module.exports = mongoose.model("User", userSchema);
