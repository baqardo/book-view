const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");

const app = express();

//* Development logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//* Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

//? Routes

app.use("/api/v1/users", userRouter);

module.exports = app;
