import express from "express";
import cors from "cors";

const app = express();

// basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// cors configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// healthcheck router
import healthCheckRouter from "./routes/healthCheck.routes.js";
app.use("/api/v1/healthcheck", healthCheckRouter);

// Auth Router
import authRouter from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Campy");
});

export default app;
