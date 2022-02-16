require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { createDog, increaseLevel } = require("./controller.js");
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

//
//
//
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});
app.post("/api/adddog", createDog);

app.put("/api/level/:dogId", increaseLevel);

//
const port = process.env.PORT || SERVER_PORT;
app.listen(port, () => console.log(`We slappin on port: ${port}`));
