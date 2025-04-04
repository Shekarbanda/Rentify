const { ROLES } = require("./constants");

const PERMISSIONS = {
  LOGIN_ADMIN: [ROLES.ADMIN],
  LOGIN_USER: [ROLES.USER],
  REGISTER_USER: [ROLES.USER],
};

module.exports = PERMISSIONS;
