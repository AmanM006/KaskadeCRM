function applyLoyaltyStyles() {
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        const scoreElement = row.querySelector(".score-number");
        if (!scoreElement) return;

        const score = parseInt(scoreElement.textContent.trim(), 10);
        console.log("Loyalty Score:", score); 

        const fill = row.querySelector(".score-fill");
        const badge = row.querySelector(".badge");

        // Set fill bar width
        fill.style.width = `${score}%`;

        // Remove existing badge classes
        badge.classList.remove("badge-loyal", "badge-regular", "badge-risk");

        // Apply styles based on score
        if (score > 80) {
            fill.style.backgroundColor = 'green';
            badge.textContent = "Loyal";
            badge.classList.add("badge-loyal");
        } else if (score >= 30) {
            fill.style.backgroundColor = 'yellow';
            badge.textContent = "Regular";
            badge.classList.add("badge-regular");
        } else {
            fill.style.backgroundColor = 'red';
            badge.textContent = "Risk";
            badge.classList.add("badge-risk");
        }
    });
}

