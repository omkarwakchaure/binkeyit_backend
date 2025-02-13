const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://omkar:w2I2nJYTaae8Thvm@cluster0.zulcyl5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Mongodb connection error!!!");
    process.exit(1);
  }
};

module.exports = connectDB;
