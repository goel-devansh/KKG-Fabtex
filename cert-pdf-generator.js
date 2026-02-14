// Certificate PDF Generator for KKG FABTEX Ecovero Certificates

function downloadCert(refNumber) {
    const certs = JSON.parse(localStorage.getItem('certificates') || '[]');
    const cert = certs.find(c => c.refNumber === refNumber);

    if (!cert) {
        alert('Certificate not found!');
        return;
    }

    generateCertPDF(cert);
}

function generateCertPDF(cert) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const pageWidth = 210;
    const margin = 15;
    let yPosition = 12;

    // Add KKG Logo (top left)
    const logoBase64 = 'data:image/jpeg;base64,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';

    try {
        doc.addImage(logoBase64, 'JPEG', margin, yPosition, 30, 15);
    } catch (e) {
        console.log('Logo not loaded');
    }

    // SUBJECT TO DELHI JURISDICTION - Centered and Underlined
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const jurisdictionText = 'SUBJECT TO DELHI JURISDICTION';
    const jurisdictionWidth = doc.getTextWidth(jurisdictionText);
    const jurisdictionX = (pageWidth - jurisdictionWidth) / 2;
    doc.text(jurisdictionText, jurisdictionX, yPosition);
    doc.line(jurisdictionX, yPosition + 1, jurisdictionX + jurisdictionWidth, yPosition + 1);

    // Phone numbers - Right aligned
    doc.setFontSize(9);
    const phoneY = yPosition;
    const rightMargin = pageWidth - margin;

    doc.text('Phone. : 9810149418', rightMargin, phoneY, { align: 'right' });
    doc.text('         9810118856', rightMargin, phoneY + 4, { align: 'right' });
    doc.text('         atulgoel1967@yahoo.com', rightMargin, phoneY + 8, { align: 'right' });

    yPosition += 18;

    // Company Name
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('KKG FABTEX', pageWidth / 2, yPosition, { align: 'center' });

    yPosition += 8;

    // Company Address
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Shed No. 72, Scheme - 1, DSIDC, Okhla Industrial Area Phase – II, New Delhi - 110020',
             pageWidth / 2, yPosition, { align: 'center' });

    yPosition += 6;

    // GSTIN
    doc.text('GSTIN : 07AAXFK2367H1ZT', pageWidth / 2, yPosition, { align: 'center' });

    yPosition += 12;

    // Ref. No. (left) and Dated (right) - BOLD
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    const refText = 'Ref. No.   KKG/' + cert.refNumber;
    doc.text(refText, margin, yPosition);
    const refNumStart = margin + doc.getTextWidth('Ref. No.   ');
    const refNumEnd = margin + doc.getTextWidth(refText);
    doc.line(refNumStart, yPosition + 0.5, refNumEnd, yPosition + 0.5);

    const dateText = 'Dated        ' + cert.date;
    doc.text(dateText, rightMargin, yPosition, { align: 'right' });
    const dateValWidth = doc.getTextWidth(cert.date);
    doc.line(rightMargin - dateValWidth, yPosition + 0.5, rightMargin, yPosition + 0.5);

    yPosition += 12;

    // CERTIFICATE NO. - Centered, Bold, Underlined
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    const certNoText = 'CERTIFICATE NO. ' + cert.certificateNo;
    const certNoWidth = doc.getTextWidth(certNoText);
    const certNoX = (pageWidth - certNoWidth) / 2;
    doc.text(certNoText, certNoX, yPosition);
    doc.line(certNoX, yPosition + 1, certNoX + certNoWidth, yPosition + 1);

    yPosition += 15;

    // ===== Certificate Body =====
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Build invoice text
    var invoiceText = '';
    if (cert.invoices.length === 1) {
        var inv = cert.invoices[0];
        invoiceText = 'VIDE OUR SALES INVOICE NO. ' + inv.invoiceNo + ' DATED ' + inv.invoiceDate + ' FOR ' + inv.meters + ' METERS';
    } else {
        var parts = [];
        for (var i = 0; i < cert.invoices.length; i++) {
            var inv = cert.invoices[i];
            if (i === 0) {
                parts.push('VIDE OUR SALES INVOICE NO. ' + inv.invoiceNo + ' DATED ' + inv.invoiceDate + ' FOR ' + inv.meters + ' METERS');
            } else {
                parts.push('AND SALES INVOICE NO. ' + inv.invoiceNo + ' DATED ' + inv.invoiceDate + ' FOR ' + inv.meters + ' METERS');
            }
        }
        invoiceText = parts.join(' ');
    }

    var bodyText = 'THIS IS TO CERTIFY THAT ' +
        cert.fabricDescription.toUpperCase() +
        ' FABRIC IS SUPPLIED TO M/S ' +
        cert.buyerName.toUpperCase() + ' ' +
        cert.buyerAddress.toUpperCase() + ' ' +
        invoiceText +
        ' ARE ECOVERO COMPLIANT GOODS MADE USING ECOVERO FIBERS FROM LENZING. THE GOOD HAVE BEEN MANUFACTURED BY M/S ' +
        cert.manufacturerName.toUpperCase() +
        ' AND YARN PRODUCER IS ' +
        cert.yarnProducer.toUpperCase() + '.';

    // Wrap and render body text
    var bodyMaxWidth = pageWidth - 2 * margin;
    var bodyLines = doc.splitTextToSize(bodyText, bodyMaxWidth);
    doc.text(bodyLines, margin, yPosition);
    yPosition += bodyLines.length * 5 + 8;

    // Contact Person
    doc.setFont('helvetica', 'bold');
    doc.text('CONTACT PERSON – ' + cert.contactPerson.toUpperCase(), margin, yPosition);
    yPosition += 6;

    doc.text('TELEPHONE NUMBER – ' + cert.telephone, margin, yPosition);
    yPosition += 6;

    doc.text('EMAIL ID – ' + cert.email, margin, yPosition);
    yPosition += 25;

    // Signature
    doc.setFont('helvetica', 'normal');
    doc.text('FOR KKG FABTEX', rightMargin, yPosition, { align: 'right' });
    yPosition += 20;
    doc.text('AUTHORISED SIGNATORY', rightMargin, yPosition, { align: 'right' });

    // Save PDF
    var fileName = 'Certificate_KKG_' + cert.refNumber + '_' + cert.buyerName.replace(/[^a-zA-Z0-9]/g, '_') + '.pdf';
    doc.save(fileName);
}
