import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const db_name = 'template'

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO+db_name);
      console.log("Connected to database")
    } catch (error) {
      console.log(error);
    }
};

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
})


app.listen(8800, () => {
    connect();
  console.log("Backend server is running.");
});
