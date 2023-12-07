const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  //bcrypt.hash
  try {
    const saltRound = 10;
    const hashedPassword = bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};
// module.exports = hashPassword;

const comparePassword = async (password, hashedPassword) => {
  //bycrpt.compare
  return bcrypt.compare(password, hashedPassword);
};
// module.exports = comparePassword;

module.exports = { hashPassword, comparePassword };
