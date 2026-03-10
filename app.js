// Utility functions

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-GB');
}

function formatCurrency(amount) {
    return 'Rs ' + parseFloat(amount).toFixed(2);
}
