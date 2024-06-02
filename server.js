const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log("DB connection successful.."))
  .catch((err) => console.error("DB connection error: ", err));

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});
