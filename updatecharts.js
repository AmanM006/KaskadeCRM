async function fetchTotalUsers() {
    try {
        console.log("📡 Fetching total users...");
        const response = await fetch("https://kaskadebackend-production.up.railway.app/api/users");

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const users = await response.json();
        console.log("✅ Total Users Fetched:", users.length);

        return users;
    } catch (error) {
        console.error("❌ Error fetching total users:", error);
        return null;
    }
}

function updateTotalUsersCount(count) {
    const totalCountElement = document.querySelector(".total-count");
    if (totalCountElement) {
        totalCountElement.innerText = `${count.toLocaleString()}`;
        console.log(`✅ Updated Total Users Count: ${count}`);
    } else {
        console.warn("⚠️ .total-count element not found!");
    }
}

// ✅ Render Loyalty Score Bar Chart
function renderLoyaltyScoreChart(loyaltyTrends) {
    console.log("📊 Loyalty Trends Data:", loyaltyTrends);

    const chartContainer = document.getElementById("loyaltyChart");
    if (!chartContainer) {
        console.error("❌ #loyaltyChart not found in the DOM.");
        return;
    }
    chartContainer.innerHTML = ""; // Clear previous chart

    if (!loyaltyTrends || loyaltyTrends.length === 0) {
        console.warn("⚠️ No loyalty trends data available.");
        chartContainer.innerHTML = "<p>No loyalty data available</p>";
        return;
    }

    // ✅ Find the max value for scaling
    const maxValue = Math.max(...loyaltyTrends.map(trend => trend.value));
    const maxHeight = 250; // Max bar height in pixels

    loyaltyTrends.forEach(trend => {
        const labelText = trend.label ?? `${trend.year}-${trend.month}`;
        const barHeight = (trend.value / maxValue) * maxHeight; // Scale bars

        const bar = document.createElement("div");
        bar.className = "chart-bar";
        bar.style.height = `${barHeight}px`;

        bar.innerHTML = `
            <div class="chart-value">${trend.value} Purchases</div>
            <div class="chart-label">${labelText}</div>
        `;

        chartContainer.appendChild(bar);
    });

    console.log("✅ Chart Rendered Successfully with Fixed Bar Heights");
}

// ✅ Fetch loyalty purchases
async function fetchLoyaltyPurchases() {
    try {
        console.log("📡 Fetching loyalty purchases...");
        const response = await fetch("https://kaskadebackend-production.up.railway.app/api/data");

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("✅ Parsed JSON Data:", data);

        if (Array.isArray(data.loyaltyTrends)) {
            console.log("📊 Loyalty Trends Received:", data.loyaltyTrends);
            localStorage.setItem("loyaltyData", JSON.stringify(data.loyaltyTrends));
        }

        return data;
    } catch (error) {
        console.error("❌ Error fetching loyalty purchases:", error);
        return null;
    }
}
window.addEventListener("DOMContentLoaded", async () => {
    console.log("✅ DOM fully loaded. Initializing charts...");

    const data = await fetchLoyaltyPurchases();
    if (data) {
        localStorage.setItem("loyaltyData", JSON.stringify(data.loyaltyTrends));
        localStorage.setItem("customerData", JSON.stringify(data.customerDistribution));
        fetchAndRenderCharts();
    }
});
async function fetchAndRenderCharts() {
    try {
        setTimeout(async () => {
            const storedPurchases = localStorage.getItem("loyaltyData");
            const storedCustomerData = localStorage.getItem("customerData");

            if (storedPurchases) {
                const loyaltyTrends = JSON.parse(storedPurchases);
                console.log("📊 Rendering Loyalty Trends Chart:", loyaltyTrends);
                renderLoyaltyScoreChart(loyaltyTrends);
            }

            if (storedCustomerData) {
                const customerData = JSON.parse(storedCustomerData);
                console.log("📊 Rendering Customer Distribution Chart:", customerData);
            }
        }, 200);
    } catch (error) {
        console.error("❌ Error fetching and rendering charts:", error);
    }
}

// ✅ Render Customer Distribution Pie Chart
function renderLoyaltyPieChart(data) {
    const canvas = document.getElementById("loyaltyPieChart");
    if (!canvas) {
        console.error("❌ Error: #loyaltyPieChart element not found!");
        return;
    }

    const ctx = canvas.getContext("2d");

    if (!data || data.total === 0) {
        console.warn("⚠️ No valid customer data for the pie chart.");
        return;
    }

    // ✅ **Ensure Data is Numeric**
    const totalCustomers = data.total;
    const loyalPercentage = (data.loyal / totalCustomers) * 100;
    const regularPercentage = (data.regular / totalCustomers) * 100;
    const atRiskPercentage = (data.atRisk / totalCustomers) * 100;
    const churnedPercentage = (data.churned / totalCustomers) * 100;

    console.log("✅ Updated Pie Chart Data:", { 
        Loyal: loyalPercentage.toFixed(1), 
        Regular: regularPercentage.toFixed(1),
        "At-Risk": atRiskPercentage.toFixed(1), 
        Churned: churnedPercentage.toFixed(1) 
    });

    // Destroy previous chart instance if it exists
    if (window.loyaltyPieChart) {
        window.loyaltyPieChart.destroy();
    }

    // 🎨 **Use CSS Variables for Colors**
    const loyalColor = getComputedStyle(document.documentElement).getPropertyValue('--loyal') || "#11f26e";
    const regularColor = getComputedStyle(document.documentElement).getPropertyValue('--regular') || "#FFFF00";
    const atRiskColor = getComputedStyle(document.documentElement).getPropertyValue('--at-risk') || "#FFA500";
    const churnedColor = getComputedStyle(document.documentElement).getPropertyValue('--churned') || "#ef220b";

    // ✅ **Create Doughnut Chart**
    window.loyaltyPieChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Loyal", "Regular", "At-Risk", "Churned"],
            datasets: [{
                data: [loyalPercentage, regularPercentage, atRiskPercentage, churnedPercentage], // Keep as numbers
                backgroundColor: [loyalColor, regularColor, atRiskColor, churnedColor], 
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true }, 
                tooltip: { enabled: true }
            }
        }
    });
}


function updateCustomerDistribution(data) {
    if (!data || data.total === 0) {
        console.warn("⚠️ No valid customer data for the donut chart.");
        return;
    }

    // ✅ Get DOM elements safely
    const totalCount = document.querySelector(".total-count");
    const loyalValue = document.querySelector(".legend-loyal + .legend-label .legend-value");
    const regularValue = document.querySelector(".legend-regular + .legend-label .legend-value");
    const atRiskValue = document.querySelector(".legend-at-risk + .legend-label .legend-value");
    const churnedValue = document.querySelector(".legend-churned + .legend-label .legend-value");

    if (!totalCount || !loyalValue || !regularValue || !atRiskValue || !churnedValue) {
        console.error("❌ One or more elements missing in the DOM. Ensure correct class names and structure.");
        return;
    }

    // 📊 Calculate percentages
    const totalCustomers = data.total;
    const loyalPercentage = ((data.loyal / totalCustomers) * 100).toFixed(1);
    const regularPercentage = ((data.regular / totalCustomers) * 100).toFixed(1);
    const atRiskPercentage = ((data.atRisk / totalCustomers) * 100).toFixed(1);
    const churnedPercentage = ((data.churned / totalCustomers) * 100).toFixed(1);

    console.log("✅ Updated Percentages:", { 
        Loyal: `${loyalPercentage}%`, 
        Regular: `${regularPercentage}%`,
        "At-Risk": `${atRiskPercentage}%`, 
        Churned: `${churnedPercentage}%`
    });

    // ✅ Dynamically update CSS variables (for conic-gradient)
    const loyalEnd = loyalPercentage;
    const regularEnd = Number(loyalEnd) + Number(regularPercentage);
    const atRiskEnd = Number(regularEnd) + Number(atRiskPercentage);
    const churnedEnd = 100;

    document.documentElement.style.setProperty("--loyal", `${loyalEnd}%`);
    document.documentElement.style.setProperty("--regular", `${regularEnd}%`);
    document.documentElement.style.setProperty("--at-risk", `${atRiskEnd}%`);
    document.documentElement.style.setProperty("--churned", `${churnedEnd}%`);

    // ✅ Update UI Text
    totalCount.textContent = totalCustomers;
    loyalValue.textContent = `${loyalPercentage}%`;
    regularValue.textContent = `${regularPercentage}%`;
    atRiskValue.textContent = `${atRiskPercentage}%`;
    churnedValue.textContent = `${churnedPercentage}%`;
}



function renderCustomerDistributionChart(data) {
    console.log("📊 Updating Customer Distribution Chart with:", data);

    const loyal = Number(data?.loyal ?? 0);
    const regular = Number(data?.regular ?? 0);
    const atRisk = Number(data?.atRisk ?? 0);
    const churned = Number(data?.churned ?? 0);
    const totalUsers = data?.totalUsers ?? 0;

    console.log(`✅ Corrected Chart Values: Loyal: ${loyal}%, At-Risk: ${atRisk}%, Churned: ${churned}%, Total Users: ${totalUsers}`);

    const loyalLegend = document.querySelector(".legend-loyal")?.parentElement?.querySelector(".legend-value");
    const regularLegend = document.querySelector(".legend-regular")?.parentElement?.querySelector(".legend-value");
    const atRiskLegend = document.querySelector(".legend-at-risk")?.parentElement?.querySelector(".legend-value");
    const churnedLegend = document.querySelector(".legend-churned")?.parentElement?.querySelector(".legend-value");

    if (loyalLegend) loyalLegend.innerText = `${loyal.toFixed(1)}%`;
    if (regularLegend) regularLegend.innerText = `${regular.toFixed(1)}%`;
    if (atRiskLegend) atRiskLegend.innerText = `${atRisk.toFixed(1)}%`;
    if (churnedLegend) churnedLegend.innerText = `${churned.toFixed(1)}%`;

    // ✅ Update total count display
    const totalCountElement = document.querySelector(".total-count");
    if (totalCountElement) {
        totalCountElement.innerText = `${totalUsers.toLocaleString()}`;
    } else {
        console.warn("⚠️ .total-count element not found!");
    }
}


// **Ensure script runs after DOM is loaded**
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM fully loaded, running script...");
    
    setTimeout(() => {
        const sampleData = {
            total: 13,
            loyal: 6,
            regular: 5,
            atRisk: 1,
            churned: 1
        };

        updateCustomerDistribution(sampleData);
    }, 500); // 🔥 Delay execution for 1s to ensure elements exist
});


