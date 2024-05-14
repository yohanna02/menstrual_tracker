import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { errorLogger, errorResponder, invalidPathHandler } from "./middlewares/errorHandlers";
import authHandler from "./api/auth";
import cycleHandler from "./api/cycle";
import logHandler from "./api/log";
import isAuthenticated from "./middlewares/isAuthenticated";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth", authHandler);
app.use("/cycle", isAuthenticated, cycleHandler);
app.use("/log", isAuthenticated, logHandler);

//Error handlers
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});