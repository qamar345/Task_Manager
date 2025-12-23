const sequelize = require("./connection");

async function TestConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = TestConnection;
