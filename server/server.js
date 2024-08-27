// import libraries
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import middleware and dbConnect function
import dbConnect from "./config/mongoose.config.js";
import storyRouter from "./routes/story.routes.js";

// pull in environment variables
dotenv.config();

// make an instance of our express service
const app = express();
const PORT = process.env.PORT;

// attach middleware to our express instance
app.use(express.json(), cors());
app.use("/api", storyRouter)

// establish a connection to MongoDB
dbConnect();

// turn everything on and listen for requests
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));