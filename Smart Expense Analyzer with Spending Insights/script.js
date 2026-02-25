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

  if (!amount || !date) {
    alert("Please enter valid data");
    return;
  }

  expenses.push({ amount, category, date });
  saveData();
  alert("Expense Added");
}

if (document.getElementById("pieChart")) {

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  document.getElementById("totalAmount").innerText = "₹" + total;
  document.getElementById("budgetAmount").innerText = "₹" + budget;
  document.getElementById("remainingAmount").innerText =
    "₹" + (budget - total);

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
        backgroundColor: ["#8b5cf6","#6366f1","#3b82f6","#06b6d4"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        label: "Spending by Category",
        data: Object.values(categoryTotals),
        backgroundColor: "#8b5cf6"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  const tableBody = document.querySelector("#expenseTable tbody");
  expenses.slice(-5).forEach(e => {
    tableBody.innerHTML += `
      <tr>
        <td>₹${e.amount}</td>
        <td>${e.category}</td>
        <td>${e.date}</td>
      </tr>
    `;
  });
}

if (document.getElementById("insightsBox")) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  let insights = "";

  if (total === 0) {
    insights = "No data available.";
  } else {
    insights = "Your spending data has been analyzed successfully.";
  }

  document.getElementById("insightsBox").innerHTML = insights;
}