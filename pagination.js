const customersPerPage = 5;
let currentPage = 1;

function updatePagination() {
    const customers = document.querySelectorAll("tbody tr"); // Select all table rows
    const totalCustomers = customers.length;
    const totalPages = Math.ceil(totalCustomers / customersPerPage);

    const startIndex = (currentPage - 1) * customersPerPage;
    const endIndex = Math.min(startIndex + customersPerPage, totalCustomers);

    document.querySelector(".page-info").textContent =
        `Showing ${startIndex + 1}-${endIndex} of ${totalCustomers} customers`;

    customers.forEach((row, index) => {
        row.style.display = (index >= startIndex && index < endIndex) ? "" : "none";
    });

    updatePageButtons(totalPages);
    applyLoyaltyStyles(); // Apply loyalty styles after pagination
}


function updatePageButtons(totalPages) {
    const pageButtonsContainer = document.querySelector(".page-buttons");
    if (!pageButtonsContainer) return;

    pageButtonsContainer.innerHTML = ""; // Clear existing buttons

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("page-btn");
        if (i === currentPage) button.classList.add("active");

        button.addEventListener("click", () => {
            currentPage = i;
            updatePagination();
        });

        pageButtonsContainer.appendChild(button);
    }
}

console.log("worke1")

updatePagination();
