import express from "express";
import { PORT } from "./config/env.js";
import subscriptionRouter from "./routes/subscription.route.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./DB/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

// Connect to MongoDB
await connectDB();

// Middlewares
app.use(errorMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

userRouter.get("/", (req, res) => {
  res.send("Users route");
});
authRouter.get("/", (req, res) => {
  res.send("Auth route");
});
subscriptionRouter.get("/", (req, res) => {
  res.send("Subscription route");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
