const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const userSummary = document.getElementById('user-summary');
const totalExpenses = document.getElementById('total-expenses');

let total = 0;
const userExpenses = {};  // Object to track expenses for each user

// Add Expense
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const userName = document.getElementById('user-name').value.trim();
  const expenseName = document.getElementById('expense-name').value.trim();
  const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

  if (!userName || !expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
    alert('Please enter valid details.');
    return;
  }

  // Add to expense list
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${userName}: ${expenseName} - ₹${expenseAmount.toFixed(2)}</span>
    <button class="delete-btn">Remove</button>
  `;
  expenseList.appendChild(li);

  // Update total expenses
  total += expenseAmount;
  totalExpenses.textContent = total.toFixed(2);

  // Update individual user expenses
  if (!userExpenses[userName]) {
    userExpenses[userName] = 0;
  }
  userExpenses[userName] += expenseAmount;

  // Update user summary
  updateUserSummary();

  // Reset form
  form.reset();

  // Delete Expense Functionality
  li.querySelector('.delete-btn').addEventListener('click', () => {
    total -= expenseAmount;
    totalExpenses.textContent = total.toFixed(2);

    // Update individual user expenses
    userExpenses[userName] -= expenseAmount;
    if (userExpenses[userName] <= 0) {
      delete userExpenses[userName];
    }

    updateUserSummary();

    expenseList.removeChild(li);
  });
});

// Update User Summary to show individual total expenses
function updateUserSummary() {
  userSummary.innerHTML = '';  // Clear existing summary
  for (const user in userExpenses) {
    const li = document.createElement('li');
    li.textContent = `${user}: ₹${userExpenses[user].toFixed(2)}`;  // Display individual total
    userSummary.appendChild(li);
  }
}
