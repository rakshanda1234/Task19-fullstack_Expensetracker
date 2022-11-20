// const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");
var cors = require("cors");

const sequelize = require("./util/database");
const Expense = require("./models/expense");

const app = express();
// const dotenv = require("dotenv");
const expenseRoutes = require("./routes/expense");

app.use(cors());
app.use(bodyparser.urlencoded());
app.use(bodyparser.json({ extended: false }));

app.use(express.json()); /// this is for handling json
app.use("/expense", expenseRoutes);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
