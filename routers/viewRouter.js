const express = require("express");
const viewController=require("../controllers/viewController")
const viewRouter = express.Router();

viewRouter.get("/", viewController.base);
module.exports = viewRouter;
