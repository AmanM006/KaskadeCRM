let dashboardStats = {};
let customersData = [];
// let currentPage = 1;
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
    
    if (btnPrimary) {
        btnPrimary.style.display = "block";
        btnPrimary.style.visibility = "visible";
    }

    console.log("btn-primary:", btnPrimary ? btnPrimary.style.display : "Not Found");

    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
        link.classList.remove("active");
    });

    document.querySelector(".sidebar-menu li:nth-child(2) a").classList.add("active");
}



function dashboardClicked() {
    console.log("hi - Dashboard button clicked");

    document.querySelectorAll(".main-content > *").forEach((section) => {
        if (section.dataset.defaultDisplay) {
            section.style.display = section.dataset.defaultDisplay;
        } else {
            section.style.display = "block"; 
        }
    });
    const dash = document.querySelector(".search-bar");
    const btn = document.querySelector(".btn-primary");
    if (btn) {
        btn.style.display = "none";  
    }
    if (dash) {
        dash.style.display = "none";
    } else {
        console.error("Customer overview section not found!");
    }
    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
        link.classList.remove("active");
    });

    document.querySelector(".sidebar-menu li:nth-child(1) a").classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".main-content > *").forEach((section) => {
        section.dataset.defaultDisplay = getComputedStyle(section).display;
    });
});

function rewardsClicked() {
    console.log("hi - rewards button clicked");

    document.querySelectorAll(".main-content > *").forEach((section) => {
        section.style.display = "none";
    });

    const rewardsGrid = document.querySelector(".card-container");
    const rewardstext = document.querySelector(".text");

if (rewardsGrid) {
    rewardsGrid.style.display = "grid"; 
} else {
    console.error("Rewards grid section not found!");
}
if (rewardstext) {
    rewardstext.style.display = "block"; 
    console.error("Rewards grid section not found!");
}
    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
        link.classList.remove("active");
    });

    document.querySelector(".sidebar-menu li:nth-child(3) a").classList.add("active");
}

function analyticsClicked() {
    console.log("hi - rewards button clicked");

    document.querySelectorAll(".main-content > *").forEach((section) => {
        section.style.display = "none";
    });

    const rewardsGrid = document.querySelector(".card-container");

if (rewardsGrid) {
    rewardsGrid.style.display = "grid"; 
} else {
    console.error("Rewards grid section not found!");
}

    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
        link.classList.remove("active");
    });

    document.querySelector(".sidebar-menu li:nth-child(3) a").classList.add("active");
}
function analyticsClicked() {
    console.log("hi - Analytics button clicked");

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

    const rewardsGrid = document.querySelector(".card-container");
    if (rewardsGrid) {
        rewardsGrid.style.display = "none";
    }

    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
        link.classList.remove("active");
    });

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


