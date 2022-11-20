const Expense = require("../models/expense");

const addexpense = async (req, res, next) => {
  try {
    const expenseamount = req.body.expense;
    const description = req.body.description;
    const category = req.body.category;

    const data = await Expense.create({
      expenseamount: expenseamount,
      description: description,
      category: category,
    });

    res.status(200).json({ newExpenseDetail: data });
  } catch (err) {
    console.log("check", err);
    res.status(500).json({
      error: err,
    });
  }
};

const getexpense = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json({ allExpenses: expenses });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteexpense = async (req, res) => {
  try {
    // if (req.param.id === "undefined") {
    //   console.log("Id is missing");
    //   return res.status(400).json({ err: "Id is missing" });
    // }
    const eid = req.params.expenseid;
    await Expense.destroy({ where: { Id: eid } });
    return res.status(200);
  } catch (err) {
    console.log("delete", err);
    res.status(500).json(err);
  }
};

module.exports = {
  deleteexpense,
  getexpense,
  addexpense,
};
