const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const worker = require("../models/workerModel");
const user = require("../models/userModel");
dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("DB connection successful.."))
  .catch((err) => console.error("DB connection error!! ", err));

const workers = JSON.parse(fs.readFileSync("workerDataImport.json", "utf-8"));
const users = JSON.parse(fs.readFileSync("userDataImport.json", "utf-8"));
//importing worker data
const importWorkerData = async () => {
  try {
    await worker.create(workers);
    console.log("data sucessfully loaded!!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete worker data
const deleteWorkerData = async () => {
  try {
    await worker.deleteMany();
    console.log("data sucessfully deleted:");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const importUserData = async () => {
  try {
    await user.create(users);
    console.log("data sucessfully loaded!!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete worker data
const deleteUserData = async () => {
  try {
    await user.deleteMany();
    console.log("data sucessfully deleted:");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] == "--importWorkers") {
  importWorkerData();
} else if (process.argv[2] == "--deleteWorkers") {
  deleteWorkerData();
} else if (process.argv[2] == "--importUsers") {
  importUserData();
} else if (process.argv[2] == "--deleteUsers") {
  deleteUserData();
}

console.log(process.argv);
