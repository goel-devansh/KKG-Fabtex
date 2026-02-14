// Initialize PO number if not set
if (!localStorage.getItem('currentPONumber')) {
    localStorage.setItem('currentPONumber', '259');
}

// Initialize empty PO array if not set
if (!localStorage.getItem('purchaseOrders')) {
    localStorage.setItem('purchaseOrders', '[]');
}

// Initialize Certificate ref number if not set
if (!localStorage.getItem('currentCertNumber')) {
    localStorage.setItem('currentCertNumber', '60');
}

// Initialize empty Certificates array if not set
if (!localStorage.getItem('certificates')) {
    localStorage.setItem('certificates', '[]');
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-GB');
}

function formatCurrency(amount) {
    return 'Rs ' + parseFloat(amount).toFixed(2);
}