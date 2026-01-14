require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use("/api/workouts", require("./routes/workout"));
const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);
// Connect to MongoDB
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
