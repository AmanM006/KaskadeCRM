let dashboardStats = {};
let customersData = [];
let currentPage = 1;
let totalPages = 1;
const sidebar = document.querySelector(".sidebar"); 
const sidebarMenu = document.querySelector(".sidebar-menu");
const menuItems = document.querySelectorAll(".sidebar-menu li a"); 
const container = document.querySelector(".container"); 
const mainContent = document.querySelector(".main-content"); 

const customer = menuItems[1];
const rewards = menuItems[2];
const analytics = menuItems[3];


function customerClicked() {
    console.log("hi - Customer button clicked");

    // Hide all sections except sidebar and customer overview
    document.querySelectorAll(".main-content > *").forEach((section) => {
        section.style.display = "none";
    });

    const customerOverview = document.querySelector(".customer-table-container");
    const searchcust = document.querySelector(".search-bar");
    const dash = document.querySelector(".header");
    const btnPrimary = document.querySelector(".btn-primary");

    if (customerOverview) customerOverview.style.display = "block";
    if (searchcust) searchcust.style.display = "flex";
    if (dash) dash.style.display = "flex";
    
    // Ensure the button is visible ONLY in this function
    if (btnPrimary) {
        btnPrimary.style.display = "block";
        btnPrimary.style.visibility = "visible";
    }

    console.log("btn-primary:", btnPrimary ? btnPrimary.style.display : "Not Found");

    // Remove "active" class from all sidebar links
    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
        link.classList.remove("active");
    });

    // Add "active" to Customers button
    document.querySelector(".sidebar-menu li:nth-child(2) a").classList.add("active");
}



function dashboardClicked() {
    console.log("hi - Dashboard button clicked");

    // Restore all sections inside main-content to their original display values
    document.querySelectorAll(".main-content > *").forEach((section) => {
        if (section.dataset.defaultDisplay) {
            section.style.display = section.dataset.defaultDisplay;
        } else {
            section.style.display = "block"; // Default fallback
        }
    });
    const dash = document.querySelector(".search-bar");
    const btn = document.querySelector(".btn-primary");
    if (btn) {
        btn.style.display = "none";  // Keep it hidden when dashboard is active
    }
    if (dash) {
        dash.style.display = "none";
    } else {
        console.error("Customer overview section not found!");
    }
    // Remove "active" class from all sidebar links
    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
        link.classList.remove("active");
    });

    // Add "active" class back to Dashboard button
    document.querySelector(".sidebar-menu li:nth-child(1) a").classList.add("active");
}

// Store original display values when the page loads
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".main-content > *").forEach((section) => {
        section.dataset.defaultDisplay = getComputedStyle(section).display;
    });
});

function rewardsClicked() {
    console.log("hi - rewards button clicked");

    // Hide all sections except sidebar and rewards grid
    document.querySelectorAll(".main-content > *").forEach((section) => {
        section.style.display = "none";
    });

    const rewardsGrid = document.querySelector(".card-container");
    const rewardstext = document.querySelector(".text");

if (rewardsGrid) {
    rewardsGrid.style.display = "grid"; // Or "flex" if using flexbox
} else {
    console.error("Rewards grid section not found!");
}
if (rewardstext) {
    rewardstext.style.display = "block"; // Or "flex" if using flexbox
} else {
    console.error("Rewards grid section not found!");
}
    // Remove "active" class from all sidebar links
    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
        link.classList.remove("active");
    });

    // Add "active" to Rewards button
    document.querySelector(".sidebar-menu li:nth-child(3) a").classList.add("active");
}

function analyticsClicked() {
    console.log("hi - rewards button clicked");

    // Hide all sections except sidebar and rewards grid
    document.querySelectorAll(".main-content > *").forEach((section) => {
        section.style.display = "none";
    });

    const rewardsGrid = document.querySelector(".card-container");

if (rewardsGrid) {
    rewardsGrid.style.display = "grid"; // Or "flex" if using flexbox
} else {
    console.error("Rewards grid section not found!");
}

    // Remove "active" class from all sidebar links
    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
        link.classList.remove("active");
    });

    // Add "active" to Rewards button
    document.querySelector(".sidebar-menu li:nth-child(3) a").classList.add("active");
}
function analyticsClicked() {
    console.log("hi - Analytics button clicked");

    // Hide all sections except sidebar and analytics sections
    document.querySelectorAll(".main-content > *").forEach((section) => {
        section.style.display = "none";
    });

    const customerOverview = document.querySelector(".dashboard-stats");
    const searchcust = document.querySelector(".charts-container");
    const dash = document.querySelector(".chart-card");
    const ana = document.querySelector(".ana");

    if (customerOverview) {
        customerOverview.style.display = "grid";
    } 
    if (searchcust) {
        searchcust.style.display = "flex";
    } 
    if (dash) {
        dash.style.display = "block";
    } 
    if (ana) {
        ana.style.display = "grid";
    }

    // Hide the Rewards section when switching back
    const rewardsGrid = document.querySelector(".card-container");
    if (rewardsGrid) {
        rewardsGrid.style.display = "none";
    }

    // Remove "active" class from all sidebar links
    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
        link.classList.remove("active");
    });

    // Add "active" to Analytics button
    document.querySelector(".sidebar-menu li:nth-child(4) a").classList.add("active");
}


customer.addEventListener("click", customerClicked);
rewards.addEventListener("click", rewardsClicked);
analytics.addEventListener("click", analyticsClicked);

customer.addEventListener("click", (event) => {
    event.preventDefault();  
});
rewards.addEventListener("click", (event) => {
    event.preventDefault();  
});
analytics.addEventListener("click", (event) => {
    event.preventDefault();  
});


function openCustomerModal(userId) {
  document.getElementById('customerModal').style.display = 'flex';
  
  fetchCustomerDetails(userId)
    .then(customerData => {
      renderCustomerDetails(customerData);
    })
    .catch(error => {
      console.error('Error fetching customer details:', error);
      // Show error message in modal
      document.querySelector('.customer-details').innerHTML = 
        `<div class="error-message">Error loading customer data. Please try again.</div>`;
    });
}

function closeCustomerModal() {
  document.getElementById('customerModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('customerModal');
  if (event.target === modal) {
    closeCustomerModal();
  }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Customer Loyalty CRM Dashboard initialized');
  
  // Initial data loading
  fetchDashboardStats();
  fetchCustomerData(1); // Start with page 1
  
  // Set up periodic refresh (every 60 seconds)
  setInterval(() => {
    fetchDashboardStats();
    fetchCustomerData(currentPage);
  }, 60000);
  
  // Set up event listeners for search
  const searchInput = document.querySelector('.search-bar input');
  let searchTimeout;
  
  searchInput.addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    
    // Debounce search to avoid too many requests
    searchTimeout = setTimeout(() => {
      const searchTerm = e.target.value.trim();
      if (searchTerm) {
        searchCustomers(searchTerm);
      } else {
        fetchCustomerData(1);
      }
    }, 500);
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const rowsPerPage = 6;
    const tableBody = document.querySelector(".customer-table tbody");
    if (!tableBody) return; // Exit if table body is not found

    const rows = Array.from(tableBody.getElementsByTagName("tr"));
    if (rows.length === 0) return; // Exit if no rows found

    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const paginationContainer = document.querySelector(".pagination .page-buttons");
    const pageInfo = document.querySelector(".page-info");

    function showPage(page) {
        if (page < 1 || page > totalPages) return; // Prevent invalid page access

        // Hide all rows
        rows.forEach(row => (row.style.display = "none"));

        // Show only the relevant rows
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
        for (let i = startIndex; i < endIndex; i++) {
            rows[i].style.display = "table-row";
        }

        // Update active pagination button safely
        document.querySelectorAll('.page-btn').forEach(button => {
            button.addEventListener('click', function() {
              fetchCustomerData(parseInt(this.textContent));
            });
          });
          

        // Update page info safely
        if (pageInfo) {
            pageInfo.textContent = `Showing ${startIndex + 1}-${endIndex} of ${totalRows} customers`;
        }
    }

    function createPagination() {
        paginationContainer.innerHTML = ""; // Clear existing pagination buttons

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.classList.add("page-btn");
            pageBtn.textContent = i;
            pageBtn.setAttribute("data-page", i);

            pageBtn.addEventListener("click", function () {
                showPage(i);
            });

            paginationContainer.appendChild(pageBtn);
        }

        // Auto-show the first page
        showPage(1);
    }

    createPagination();
});


  
  // Set up event listeners for Filter and Export buttons
  document.querySelector('.table-actions').addEventListener('click', function(e) {
    if (e.target.textContent === 'Filter') {
      // Implement filter functionality
      alert('Filter functionality would be implemented here');
    } else if (e.target.textContent === 'Export') {
      exportCustomerData();
    } else if (e.target.textContent === 'Add Customer') {
      // Implement add customer functionality
      alert('Add customer functionality would be implemented here');
    }
  });
});

// Fetch dashboard statistics from the backend
function fetchDashboardStats() {
  fetch('/api/dashboard/stats')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      dashboardStats = data;
      updateDashboardStats(data);
      updateCharts(data);
    })
    .catch(error => {
      console.error('Error fetching dashboard stats:', error);
    });
}

// Update the dashboard statistics UI
function updateDashboardStats(data) {
  // Update total customers card
  document.querySelectorAll('.stat-card').forEach((card, index) => {
    const statTitle = card.querySelector('.stat-title').textContent;
    
    if (statTitle === 'Total Customers') {
      card.querySelector('.stat-value').textContent = data.totalCustomers.toLocaleString();
      const change = data.totalCustomersChange;
      updateStatChange(card, change);
    } else if (statTitle === 'Loyal Customers') {
      card.querySelector('.stat-value').textContent = data.loyalCustomers.toLocaleString();
      const change = data.loyalCustomersChange;
      updateStatChange(card, change);
    } else if (statTitle === 'At-Risk Customers') {
      card.querySelector('.stat-value').textContent = data.atRiskCustomers.toLocaleString();
      const change = data.atRiskCustomersChange;
      updateStatChange(card, change);
    } else if (statTitle === 'Churned Customers') {
      card.querySelector('.stat-value').textContent = data.churnedCustomers.toLocaleString();
      const change = data.churnedCustomersChange;
      updateStatChange(card, change);
    }
  });
  
  // Update totals in the donut chart
  document.querySelector('.total-count').textContent = data.totalCustomers.toLocaleString();
}

// Helper function to update stat change with color
function updateStatChange(card, change) {
  const statChangeElement = card.querySelector('.stat-change');
  
  if (change > 0) {
    statChangeElement.textContent = `+${change.toFixed(1)}% from last month`;
    statChangeElement.style.color = 'var(--success)';
  } else if (change < 0) {
    statChangeElement.textContent = `${change.toFixed(1)}% from last month`;
    statChangeElement.style.color = 'var(--danger)';
  } else {
    statChangeElement.textContent = `${change.toFixed(1)}% from last month`;
    statChangeElement.style.color = 'var(--text-muted)';
  }
}

// Update charts with new data
function updateCharts(data) {
  // Update monthly loyalty score trend chart
  if (data.monthlyLoyaltyScores) {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    data.monthlyLoyaltyScores.forEach((score, index) => {
      if (index < chartBars.length) {
        chartBars[index].style.height = `${score}%`;
        chartBars[index].querySelector('.chart-value').textContent = score;
      }
    });
  }
  
  // Update distribution chart (donut chart)
  if (data.customerDistribution) {
    const donutChart = document.querySelector('.donut-chart');
    const dist = data.customerDistribution;
    
    // Update donut chart gradient
    donutChart.style.background = `conic-gradient(
      var(--loyal) 0% ${dist.loyal}%,
      var(--at-risk) ${dist.loyal}% ${dist.loyal + dist.atRisk}%,
      var(--churned) ${dist.loyal + dist.atRisk}% 100%
    )`;
    
    // Update legend values
    const legendItems = document.querySelectorAll('.legend-item');
    legendItems[0].querySelector('.legend-value').textContent = `${dist.loyal}%`;
    legendItems[1].querySelector('.legend-value').textContent = `${dist.atRisk}%`;
    legendItems[2].querySelector('.legend-value').textContent = `${dist.churned}%`;
  }
}

// Fetch customer data for table
function fetchCustomerData(page) {
  currentPage = page;
  
  fetch(`/api/customers?page=${page}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      customersData = data.customers;
      totalPages = data.totalPages;
      
      renderCustomerTable(data.customers);
      updatePagination(data.currentPage, data.totalPages, data.totalCustomers);
    })
    .catch(error => {
      console.error('Error fetching customer data:', error);
    });
}

// Render customer table with data
function renderCustomerTable(customers) {
  const tableBody = document.querySelector('.customer-table tbody');
  tableBody.innerHTML = '';
  
  if (customers.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 20px;">
          No customers found. Try adjusting your search criteria.
        </td>
      </tr>
    `;
    return;
  }
  
  customers.forEach(customer => {
    // Determine category class and style based on loyalty score
    let categoryClass, scoreClass;
    
    if (customer.loyaltyScore >= 80) {
      categoryClass = 'badge-loyal';
      scoreClass = 'score-loyal';
    } else if (customer.loyaltyScore >= 50) {
      categoryClass = 'badge-at-risk';
      scoreClass = 'score-at-risk';
    } else {
      categoryClass = 'badge-churned';
      scoreClass = 'score-churned';
    }
    
    tableBody.innerHTML += `
      <tr>
        <td class="customer-name">${customer.name}</td>
        <td>${customer.userId}</td>
        <td>${customer.purchases}</td>
        <td>${customer.lastActivity}</td>
        <td>
          <div class="loyalty-score">
            <div class="score-number">${customer.loyaltyScore}</div>
            <div class="score-bar">
              <div class="${scoreClass}" style="width: ${customer.loyaltyScore}%"></div>
            </div>
          </div>
        </td>
        <td><span class="badge ${categoryClass}">${customer.category}</span></td>
        <td>${customer.recommendedReward}</td>
        <td>
          <button class="action-btn" onclick="openCustomerModal('${customer.userId}')">👁️</button>
        </td>
      </tr>
    `;
  });
}

// Update pagination controls
function updatePagination(currentPage, totalPages, totalCustomers) {
  const paginationContainer = document.querySelector('.pagination');
  const pageInfo = paginationContainer.querySelector('.page-info');
  const pageButtons = paginationContainer.querySelector('.page-buttons');
  
  // Calculate range of customers being shown
  const itemsPerPage = customersData.length;
  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, totalCustomers);
  
  // Update page info text
  pageInfo.textContent = `Showing ${firstItem}-${lastItem} of ${totalCustomers.toLocaleString()} customers`;
  
  // Generate page buttons
  pageButtons.innerHTML = '';
  
  // Logic for showing page numbers with ellipsis for large number of pages
  if (totalPages <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.innerHTML += `
        <button class="page-btn ${i === currentPage ? 'active' : ''}">${i}</button>
      `;
    }
  } else {
    // Show first page
    pageButtons.innerHTML += `
      <button class="page-btn ${currentPage === 1 ? 'active' : ''}">1</button>
    `;
    
    // Show ellipsis or pages before current
    if (currentPage > 3) {
      pageButtons.innerHTML += `<button class="page-btn">...</button>`;
    }
    
    // Show pages around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.innerHTML += `
        <button class="page-btn ${i === currentPage ? 'active' : ''}">${i}</button>
      `;
    }
    
    // Show ellipsis or pages after current
    if (currentPage < totalPages - 2) {
      pageButtons.innerHTML += `<button class="page-btn">...</button>`;
    }
    
    // Show last page
    pageButtons.innerHTML += `
      <button class="page-btn ${currentPage === totalPages ? 'active' : ''}">${totalPages}</button>
    `;
  }
}

// Fetch individual customer details
function fetchCustomerDetails(userId) {
  return fetch(`/api/customers/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

// Render customer details in modal
function renderCustomerDetails(customer) {
  const customerDetails = document.querySelector('.customer-details');
  
  // You would update this based on your actual customer data structure
  customerDetails.innerHTML = `
    <div class="detail-card">
      <div class="detail-label">Customer Name</div>
      <div class="detail-value">${customer.name}</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">User ID</div>
      <div class="detail-value">${customer.userId}</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Email</div>
      <div class="detail-value">${customer.email}</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Phone</div>
      <div class="detail-value">${customer.phone}</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Loyalty Score</div>
      <div class="detail-value">${customer.loyaltyScore}</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Total Purchases</div>
      <div class="detail-value">${customer.purchases}</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Last Activity</div>
      <div class="detail-value">${customer.lastActivity}</div>
    </div>
    <div class="detail-card">
      <div class="detail-label">Customer Since</div>
      <div class="detail-value">${customer.customerSince}</div>
    </div>
    
    <div class="rewards-section" style="grid-column: span 2;">
      <h3>Recommended Rewards</h3>
      ${customer.rewards.map(reward => `
        <div class="reward-card">
          <div class="reward-title">${reward.title}</div>
          <div class="reward-description">${reward.description}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// Search for customers
function searchCustomers(searchTerm) {
  fetch(`/api/customers/search?term=${encodeURIComponent(searchTerm)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      customersData = data.customers;
      
      renderCustomerTable(data.customers);
      updatePagination(data.currentPage, data.totalPages, data.totalCustomers);
    })
    .catch(error => {
      console.error('Error searching customers:', error);
    });
}

// Export customer data
function exportCustomerData() {
  fetch('/api/customers/export')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      // Create a link to download the file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'customer_data.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Error exporting customer data:', error);
    });
}
