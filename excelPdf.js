function exportExcel() {

    let wb =
        XLSX.utils.table_to_book(
            document.getElementById("billTable"),
            {
                sheet: "Bill"
            });

    XLSX.writeFile(
        wb,
        "Bill.xlsx"
    );

}


function downloadPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    const now = new Date();

    const invoiceId =
        "INV-" +
        now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0') +
        "-" +
        String(now.getHours()).padStart(2, '0') +
        String(now.getMinutes()).padStart(2, '0') +
        String(now.getSeconds()).padStart(2, '0');

    let currentDate =
        now.toLocaleDateString();

    let currentTime =
        now.toLocaleTimeString();

    doc.setFontSize(18);
    doc.text(
        "PRATEJ SHOPPING APPLICATION",
        40,
        15
    );

    doc.setFontSize(12);

	doc.text("Subtotal", 110, lastY);
	doc.text("₹ " + grandTotal, 170, lastY);

	doc.text("CGST (" + cgstPercent + "%)", 110, lastY + 10);
	doc.text("₹ " + cgstAmount, 170, lastY + 10);

	doc.text("SGST (" + sgstPercent + "%)", 110, lastY + 20);
	doc.text("₹ " + sgstAmount, 170, lastY + 20);

	doc.setFontSize(14);

	doc.text("Grand Total", 110, lastY + 35);
	doc.text("₹ " + finalAmount, 170, lastY + 35);


    doc.setFontSize(12);

    doc.text(
        "Thank You For Your Business",
        60,
        lastY + 60
    );

    doc.save(
        invoiceId + ".pdf"
    );

}