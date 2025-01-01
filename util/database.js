const Sequelize = require("sequelize");

const sequelize = new Sequelize("charity", "root", "Root@5544", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
