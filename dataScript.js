const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const worker = require("./admin/adminModel");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("DB connection successful.."))
  .catch((err) => console.error("DB connection error!! ", err));

const workers = JSON.parse(fs.readFileSync("data.json", "utf-8"));

//importing data
const importData = async () => {
  try {
    await worker.create(workers);
    console.log("data sucessfully loaded!!");
  } catch (err) {
    console.log(err);
  }
};

//delete data
const deleteData = async () => {
  try {
    await worker.deleteMany();
    console.log("data sucessfully deleted:");
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == "--import") {
  importData();
} else if (process.argv[2] == "--delete") {
  deleteData();
}

console.log(process.argv);
