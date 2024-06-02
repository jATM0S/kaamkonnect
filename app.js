const express = require("express");
const app = express();

app.use(express.json());

const router = require("./admin/routers");
app.use("/admin", router);

module.exports = app;
