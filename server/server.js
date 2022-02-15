require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { seed } = require("./seed.js");
const { SERVER_PORT } = process.env;
const app = express();
const {} = require("./controller.js");
//
//
//
app.use(express.json());
app.use(cors());
app.use(express.static("client"));
//
//

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

//
const port = process.env.PORT || SERVER_PORT;
app.listen(SERVER_PORT, () =>
  console.log(`We slappin on port: ${SERVER_PORT}`)
);
