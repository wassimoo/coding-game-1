/*
 * Initializes the Express application with security middleware and rate limiting options.
 * Ideally, some of these measures can be handled by an API gateway. This is for demonstration purposes.
 **/

import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // Every 1 minute
  max: 100, // Limit each IP to 100 requests
  standardHeaders: true,
  legacyHeaders: false,
});

export const configureApp = (app: express.Application) => {
  // Security headers
  app.use(helmet());

  // Enable CORS
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production" ? process.env.CORS_ORIGIN : "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    })
  );

  // Rate limiting
  if (process.env.NODE_ENV === "production") {
    app.use(limiter);
  }

  // Body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
