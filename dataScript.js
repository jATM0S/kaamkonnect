const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const worker = require("./models/workerModel");
const user = require("./models/userModel");
dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("DB connection successful.."))
  .catch((err) => console.error("DB connection error!! ", err));

const workers = JSON.parse(fs.readFileSync("workerData.json", "utf-8"));
const users = JSON.parse(fs.readFileSync("userData.json", "utf-8"));
//importing worker data
const importWorkerData = async () => {
  try {
    await worker.create(workers);
    console.log("data sucessfully loaded!!");
  } catch (err) {
    console.log(err);
  }
};

//delete worker data
const deleteWorkerData = async () => {
  try {
    await worker.deleteMany();
    console.log("data sucessfully deleted:");
  } catch (err) {
    console.log(err);
  }
};

const importUserData = async () => {
  try {
    await user.create(users);
    console.log("data sucessfully loaded!!");
  } catch (err) {
    console.log(err);
  }
};

//delete worker data
const deleteUserData = async () => {
  try {
    await user.deleteMany();
    console.log("data sucessfully deleted:");
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] == "--importWorkers") {
  importWorkerData();
  process.exit();
} else if (process.argv[2] == "--deleteWorkers") {
  deleteWorkerData();
  process.exit();
} else if (process.argv[2] == "--importUsers") {
  importUserData();
  process.exit();
} else if (process.argv[2] == "--deleteUsers") {
  deleteUserData();
  process.exit();
}

console.log(process.argv);
