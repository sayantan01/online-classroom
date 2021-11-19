const express = require("express");
const cors = require("cors");
const path = require("path");
const bearerToken = require("express-bearer-token");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/classRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("./swagger/setup");

// setting up swagger to generate api docs
const options = {
  swaggerDefinition,
  apis: [`${__dirname}/swagger/*js`],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();
dotenv.config();

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(bearerToken());

// establishing mongodb connection
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(""))
  .catch((err) => console.log(err));

mongoose.connection.once("open", () =>
  console.log("successfully connected to db")
);

// routes
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname + "../../client/build")));

  app.get("*", (req, res, next) => {
    if (/^\/api.*$/.test(req.url)) return next();
    res.sendFile(path.join(__dirname + "../../client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ test: "success" });
  });
}

app.use("/api/user", userRoutes);
app.use("/api/classroom", classRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// setup the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`));
