require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.route");

// VARIABLES
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

// EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

//  TEST API
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to sparkle bazaar server" });
});

// BYAPSS APIs
app.use("/api/users", userRoutes);

// DB
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
