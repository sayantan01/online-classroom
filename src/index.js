const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(""))
  .catch((err) => console.log(err));

mongoose.connection.once("open", () =>
  console.log("successfully connected to db")
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname + "../../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../../client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ test: "success" });
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`));
