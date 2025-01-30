import express from "express";
import dotenv from "dotenv";
import { configureApp } from "./configureApp";
import calendarRouter from "./router/calendarRouter";

dotenv.config();
const PORT = process.env.PORT || 3000;

// Configure application with external middleware
const app = express();
configureApp(app);

// Define routes
app.use("/calendar", calendarRouter);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
