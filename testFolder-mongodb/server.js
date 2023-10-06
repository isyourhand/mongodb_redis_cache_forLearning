import mongoose from "mongoose";
import app from "./app.js";
import "dotenv/config";

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log("DB connection seccessful");
});

const port = 4001;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
