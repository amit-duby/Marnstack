import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongodb run port on localhost://${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
export default ConnectDB;
