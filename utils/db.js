const mongoose = require("mongoose");

//const URI = "mongodb://127.0.0.1:27017/mern_admin_panel";
const URI = process.env.MONGODB_URI
const connectDb = async () => {
  try {
    await mongoose.connect(URI);//connect Backend with MongoDB Database
    console.log("connection successful to DB");
  } catch (error) {
    console.error("database connection fail");
    process.exit(0);
  }
};

module.exports = connectDb;


//install npm i mongoose
// to get URI of local : write 'mongosh' in cmd