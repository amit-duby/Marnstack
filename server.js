import express, { json } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import ConnectDB from "./config/db.js";
import user from "./routes/Userrouts.js";
import cont from "./routes/CotegaryRout.js";
import proud from "./routes/ProductRout.js";
// import authrout from "./routes/Userrouts.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// router............
app.use("/api/v1/auth", user);
// app.use("/api/v1/auth", authrout);
app.use("/api/v1/category", cont);
app.use("/api/v1/product", proud);
// port colum............
dotenv.config({ path: "./config/.env" });
app.listen(process.env.PORT, function () {
  ConnectDB();
  console.log(`server is runing port number ${process.env.PORT}`);
});
