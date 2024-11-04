import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

const PORT = process.env.PORT

Connection();

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});