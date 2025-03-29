async function updateDashboardStats() {
    try {
        const response = await fetch("https://kaskadebackend-production.up.railway.app/api/users");
        const customers = await response.json();

        // Calculate stats based on correct key names
        const totalCustomers = customers.length;
        const loyalCustomers = customers.filter(c => c.loyaltyScore >= 80).length;
        const atRiskCustomers = customers.filter(c => c.loyaltyScore <30 && c.loyaltyScore > 10).length;
        const churnedCustomers = customers.filter(c => c.loyaltyScore <= 10).length;

        // Update HTML elements
        document.getElementById("total-customers").textContent = totalCustomers;
        document.getElementById("loyal-customers").textContent = loyalCustomers;
        document.getElementById("at-risk-customers").textContent = atRiskCustomers;
        document.getElementById("churned-customers").textContent = churnedCustomers;
    } catch (error) {
        console.error("Error fetching customer data:", error);
    }
}

// Call function on page load and refresh every 10 seconds
document.addEventListener("DOMContentLoaded", updateDashboardStats);
setInterval(updateDashboardStats, 10000); // Refresh stats every 10 seconds
