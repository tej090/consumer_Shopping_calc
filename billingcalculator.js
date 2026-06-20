document.getElementById("currentDate").value =
new Date().toLocaleDateString();

function calculateTotals() {

    let grand = 0;

    document.querySelectorAll("#tableBody tr").forEach(row => {

        let qty =
            parseFloat(row.querySelector(".qty").value) || 0;

        let price =
            parseFloat(row.querySelector(".price").value) || 0;

        let total = qty * price;

        row.querySelector(".rowTotal").value =
            total.toFixed(2);

        grand += total;

    });

    let cgst =
        parseFloat(document.getElementById("cgst").value) || 0;

    let sgst =
        parseFloat(document.getElementById("sgst").value) || 0;

    let final =
        grand +
        (grand * cgst / 100) +
        (grand * sgst / 100);

    document.getElementById("grandTotal").value =
        grand.toFixed(2);

    document.getElementById("finalAmount").value =
        final.toFixed(2);

}

document.addEventListener("input", calculateTotals);

document.getElementById("addRow").onclick = function () {

    let tr = document.createElement("tr");

    tr.innerHTML = `
    <td>
        <input type="text"
        class="form-control product">
    </td>

    <td>
        <input type="number"
        class="form-control qty"
        value="1">
    </td>

    <td>
        <input type="number"
        class="form-control price"
        value="0">
    </td>

    <td>
        <input type="number"
        class="form-control rowTotal"
        readonly>
    </td>

    <td>
        <button class="btn btn-danger btn-sm removeRow">
            <i class="bi bi-trash"></i>
        </button>
    </td>
    `;

    document.getElementById("tableBody")
        .appendChild(tr);

};

document.addEventListener("click", function (e) {

    if (
        e.target.closest(".removeRow")
    ) {

        e.target.closest("tr").remove();

        calculateTotals();

    }

});

function saveProducts() {

    localStorage.setItem(
        "products",
        document.getElementById("productList").value
    );

    alert("Products Saved");

}

window.onload = function () {

    let products =
        localStorage.getItem("products");

    if (products) {

        document.getElementById("productList").value =
            products;

    }

    calculateTotals();

};

function addProductsToBill() {

    let products =
        document.getElementById("productList")
            .value
            .split("\n");

    products.forEach(function (item) {

        if (item.trim() !== "") {

            let tr = document.createElement("tr");

            tr.innerHTML = `
            <td>
                <input type="text"
                class="form-control product"
                value="${item}">
            </td>

            <td>
                <input type="number"
                class="form-control qty"
                value="1">
            </td>

            <td>
                <input type="number"
                class="form-control price"
                value="0">
            </td>

            <td>
                <input type="number"
                class="form-control rowTotal"
                readonly>
            </td>

            <td>
                <button class="btn btn-danger btn-sm removeRow">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
            `;

            document.getElementById("tableBody")
                .appendChild(tr);

        }

    });

    calculateTotals();

}