const {sequelize} = require("../model/index.js");

async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log("✅ All tables synced successfully!");
  } catch (error) {
    console.error("❌ Unable to connect or sync database:", error);
  }
}

module.exports = syncDatabase;
