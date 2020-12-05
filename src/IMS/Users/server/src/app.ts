import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authService from "./service/authService";

dotenv.config();
const app = express();

mongoose.connect(process.env.DATABASE_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () =>
  console.log(`Connected to database: ${process.env.DATABASE_URL}`)
);

app.use(cors());
app.use(express.json());

app.use("/api", authService);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port: ${process.env.PORT}`);
});
