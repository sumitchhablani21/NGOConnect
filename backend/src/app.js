import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is alive",
  });
});

import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter);

export { app };
