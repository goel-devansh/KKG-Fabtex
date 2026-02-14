// Initialize PO number if not set
if (!localStorage.getItem('currentPONumber')) {
    localStorage.setItem('currentPONumber', '259');
}

// Initialize empty PO array if not set
if (!localStorage.getItem('purchaseOrders')) {
    localStorage.setItem('purchaseOrders', '[]');
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-GB');
}

function formatCurrency(amount) {
    return 'Rs ' + parseFloat(amount).toFixed(2);
}