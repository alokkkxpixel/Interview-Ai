const mongoose = require("mongoose");
const dns = require("dns");

// Force Node.js to use Google DNS (8.8.8.8) because the default ISP DNS
// refuses SRV record queries required by the mongodb+srv:// protocol.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectToDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

      console.log("✅ MongoDB connected");
    })
    .catch((err) => {
      console.log("❌ MongoDB connection error", err);
    });
}

module.exports = connectToDB;
