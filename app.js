import express from "express";
import { PORT } from "./config/env.js";
import subscriptionRouter from "./routes/subscription.route.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./DB/mongodb.js";

const app = express();

await connectDB(); // Top-level await works if using ES Modules

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
