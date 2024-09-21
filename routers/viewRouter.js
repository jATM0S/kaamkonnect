const express = require("express");
const viewController=require("../controllers/viewController")
const viewRouter = express.Router();

viewRouter.get("/profile", viewController.profile);
viewRouter.get("/workerDetail", viewController.workerDetail);
viewRouter.get("/dashboardWork", viewController.dashboardWork);
viewRouter.get("/dashboardReview", viewController.dashboardReview);
viewRouter.get("/settingProfile", viewController.settingProfile);
viewRouter.get("/settingWorker", viewController.settingWorker);
viewRouter.get("/settingPassword", viewController.settingPassword);
viewRouter.get("/settingDelete", viewController.settingDelete);
module.exports = viewRouter;
