const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Charity = sequelize.define("charity", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  isApproved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
  },
  goal: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
module.exports = Charity;
