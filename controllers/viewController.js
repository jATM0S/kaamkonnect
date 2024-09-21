exports.profile = (req, res) => {
  res.status(200).render("pages/profile.ejs");
};

exports.workerDetail = (req, res) => {
  res.status(200).render("pages/workerDetail.ejs");
};
exports.dashboardWork = (req, res) => {
  res.status(200).render("pages/dashboardWork.ejs");
};
exports.dashboardReview = (req, res) => {
  res.status(200).render("pages/dashboardReview.ejs");
};
exports.settingProfile = (req, res) => {
  res.status(200).render("pages/settingProfile.ejs");
};
exports.settingWorker = (req, res) => {
  res.status(200).render("pages/settingWorker.ejs");
};
exports.settingPassword = (req, res) => {
  res.status(200).render("pages/settingPassword.ejs");
};
exports.settingDelete= (req, res) => {
  res.status(200).render("pages/settingDelete.ejs");
};
