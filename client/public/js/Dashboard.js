
//Dashboard logic 

// Example data (replace this with your actual data)
var categoryData = {
    // {Category: value} => {'Food': 300, 'Transportation': 150, 'Entertainment': 200, 'Utilities': 100, 'Others': 50}
    labels: ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Others'],
    datasets: [{
        label: 'Spending by Category',
        data: [300, 150, 200, 100, 50],
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1
    }]
};

// Get the context of the canvas element
var ctx = document.getElementById('spendingChart').getContext('2d');

// Create the chart
var spendingChart = new Chart(ctx, {
    type: 'bar',
    data: categoryData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'top',
                formatter: function (value, context) {
                    return '$' + value; // Format the label as currency
                }
            }
        }
    }
});

var transactions = [
    { date: 'Oct 15, 2023', description: 'Grocery shopping', amount: -50 },
    { date: 'Oct 14, 2023', description: 'Dinner at a restaurant', amount: -30 },
    { date: 'Oct 13, 2023', description: 'Gas refueling', amount: -40 },
    // Add more transactions as needed
];
// Function to dynamically add transactions to the transaction-list
function addTransactionsToDOM() {
    var transactionList = document.getElementById('transactionList');

    transactions.forEach(function (transaction) {
        var transactionItem = document.createElement('div');
        transactionItem.classList.add('transaction-item');

        transactionItem.innerHTML = `
            <span class="transaction-date">${transaction.date}</span>
            <span class="transaction-description">${transaction.description}</span>
            <span class="transaction-amount">${transaction.amount}</span>
        `;

        transactionList.appendChild(transactionItem);
    });
}
// Call the function to add transactions to the DOM
addTransactionsToDOM();