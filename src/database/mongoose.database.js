const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsctaskmanegercluster.9uhny.mongodb.net/?retryWrites=true&w=majority&appName=FSCTaskManegerCluster`
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Encerra o processo se a conexão falhar
  }
};

module.exports = connectToDatabase;
