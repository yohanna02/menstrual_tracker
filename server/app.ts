import express from "express";
import dotenv from "dotenv";
import { errorLogger, errorResponder, invalidPathHandler } from "./middlewares/errorHandlers";

dotenv.config();

const app = express();

//Error handlers
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});