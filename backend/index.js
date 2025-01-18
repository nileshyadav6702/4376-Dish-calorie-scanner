/**
 * @fileoverview Entry point for the Calorie Counter backend server.
 * Sets up the Express application, connects to MongoDB, and defines routes.
 */
import cors from 'cors';
import express from 'express';
import dishRoutes from './routes/dishroute.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from "path";
import userrouter from "./routes/user.js";
import { urlencoded } from 'express';
import { restrictologinuser } from './middleware/auth.js';

const app = express();
const port = 3000;

/**
 * Middleware to parse JSON and URL-encoded data and cookies.
 * Also applies user login restriction middleware.
 */
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(restrictologinuser);

const MONGO_URI = "mongodb://127.0.0.1:27017/dish-api";


/**
 * Connects to MongoDB using Mongoose.
 * Logs a message upon successful connection.
 */
mongoose
.connect(MONGO_URI)
.then(() => {
  console.log('mongo connection established');
})

/**
 * Root route handler.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */


/**
 * Defines routes for user and dish APIs.
 */
app.use("/user", userrouter);
app.use("/api/dishes", dishRoutes);

/**
 * Starts the server and listens on the specified port.
 * Logs a message indicating the server is running.
 */
app.listen(port, () => {
});
