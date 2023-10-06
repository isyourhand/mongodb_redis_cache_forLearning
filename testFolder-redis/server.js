import mongoose from "mongoose";
import app from "./app.js";

import "dotenv/config";

const db = process.env.DATABASE;

mongoose.connect(db).then(() => {
  console.log("Mongodb Connection Successful.");
});

const port = 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
