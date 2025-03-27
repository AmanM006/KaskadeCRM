function exportTableToCSV() {
    console.log("work")

    let csvContent = "data:text/csv;charset=utf-8,"; 

    const rows = document.querySelectorAll("table tr");
    rows.forEach((row) => {
        let rowdata = [];
        console.log("working")
        row.querySelectorAll("td, th").forEach((cell) => {
            rowdata.push(cell.textContent.trim());
        });

        csvContent += rowdata.join(",") + "\n";
        console.log("working2")

    })
    console.log("working4")

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "loyalty_scores.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("working5")

};

document.querySelectorAll(".table-actions .btn-outline")[1].addEventListener("click", function () {
    console.log("clicked")
    exportTableToCSV();
});