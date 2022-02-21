require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const {
  createDog,
  increaseLevel,
  deleteDog,
  getDogs,
  trainDog,
} = require("./controller.js");
const { SERVER_PORT } = process.env;
const app = express();
//
//
//
app.use(express.json());
app.use(cors());
app.use(express.static("client"));
//
//
app.get("https://dog.ceo/api/breeds/image/random", (req, res) => {
  const { message, status } = req.body;
  res.send(message);
});
//
app.get("/api/train/:dogId", trainDog);
//
app.post("/dogs", getDogs);
//
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});
app.post("/api/adddog", createDog);

app.put("/api/level/:dogId", increaseLevel);
app.delete("/api/:dogId", deleteDog);

//
const port = process.env.PORT || SERVER_PORT;
app.listen(port, () => console.log(`We slappin on port: ${port}`));
