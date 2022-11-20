const form = document.getElementById("my-form");

let Id;
let Li;

const onDelete = async (id, li) => {
  console.log("delete clicked", id);
  await axios
    .delete(`http://localhost:3000/expense/deleteexpense/${id}`)
    .then(() => li.remove())
    .catch((e) => console.log(e));
};

const onEdit = (id, expense, description, category, li) => {
  const btn = document.getElementById("submit");
  const exp = document.getElementById("expense");
  const des = document.getElementById("description");
  const cat = document.getElementById("category");

  exp.value = expense;
  des.value = description;
  cat.value = category;
  btn.value = "Add Expense";
};
const createExpense = ({ expenseamount, description, category, id }) => {
  const userList = document.getElementById("showlist");
  const li = document.createElement("li");
  const del = document.createElement("button");
  const edit = document.createElement("button");

  del.appendChild(document.createTextNode("Delete"));
  del.addEventListener("click", () => onDelete(id, li));
  edit.appendChild(document.createTextNode("Edit"));
  edit.addEventListener("click", () =>
    onEdit(Id, expenseamount, description, category, li)
  );
  del.style.margin = "4px";
  edit.style.margin = "4px";

  li.appendChild(document.createTextNode(`${expenseamount}  -`));
  li.appendChild(document.createTextNode(`${description}  -`));
  li.appendChild(document.createTextNode(`${category}`));

  li.appendChild(del);
  li.appendChild(edit);

  userList.appendChild(li);
};

const showExpenses = (expenses) => {
  expenses.forEach((expense) => {
    createExpense(expense);
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("submit");
  const exp = document.getElementById("expense");
  const des = document.getElementById("description");
  const cat = document.getElementById("category");

  const obj = {
    expense: e.target.expense.value,
    description: e.target.description.value,
    category: e.target.category.value,
  };

  if (btn.value === "Add Expense") {
    await axios
      .post("http://localhost:3000/expense/addexpense", obj)
      .then((res) => {
        createExpense(res.data);
        exp.value = "";
        des.value = "";
        cat.value = "";
      })
      .catch((e) => console.log(e));
  } else {
    await axios
      .put(`http://localhost:3000/expense/${updatedId}`, obj)
      .then(() => {
        updatedLi.childNodes[0].nodeValue = obj.expense + "  ";
        updatedLi.childNodes[1].nodeValue = obj.description + "  ";
        updatedLi.childNodes[2].nodeValue = obj.category + "  ";
        exp.value = "";
        des.value = "";
        cat.value = "";
        btn.value = "Add Expense";
      })
      .catch((e) => console.log(e));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3000/expense/getexpenses").then((res) => {
    console.log("res", res);
    showExpenses(res.data.allExpenses);
  });
});
