import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { errorLogger, errorResponder, invalidPathHandler } from "./middlewares/errorHandlers";
import authHandler from "./api/auth";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth", authHandler);

//Error handlers
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});