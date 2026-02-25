let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = parseFloat(localStorage.getItem("budget")) || 0;

function saveData() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function setBudget() {
  budget = parseFloat(document.getElementById("budget").value);
  localStorage.setItem("budget", budget);
  alert("Budget Saved");
}

function addExpense() {
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!amount || !date) return alert("Enter valid data");

  expenses.push({ amount, category, date });
  saveData();
  alert("Expense Added");
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveData();
  location.reload();
}

function clearAll() {
  localStorage.clear();
  location.reload();
}

if (document.getElementById("pieChart")) {

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  document.getElementById("totalAmount").innerText = "₹" + total;
  document.getElementById("budgetAmount").innerText = "₹" + budget;
  document.getElementById("remainingAmount").innerText = "₹" + (budget - total);

  let categoryTotals = {};
  expenses.forEach(e => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  new Chart(document.getElementById("pieChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: ["#2563eb","#60a5fa","#93c5fd","#bfdbfe"]
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        label: "Spending by Category",
        data: Object.values(categoryTotals),
        backgroundColor: "#2563eb"
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const tableBody = document.querySelector("#expenseTable tbody");
  expenses.forEach((e, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>₹${e.amount}</td>
        <td>${e.category}</td>
        <td>${e.date}</td>
        <td><button onclick="deleteExpense(${index})">Delete</button></td>
      </tr>
    `;
  });
}

if (document.getElementById("insightsBox")) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  let message = total > budget 
    ? "⚠ You exceeded your monthly budget."
    : "✓ Your spending is within the budget.";

  document.getElementById("insightsBox").innerHTML = message;
}