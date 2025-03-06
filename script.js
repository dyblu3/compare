// Function to compare data
function compareData() {
    const message = document.getElementById("message");
    const countMatches = document.getElementById("countMatches");
    const loader = document.getElementById("loader");

    // Show loader
    loader.style.display = "block";

    // Get data from user input
    const data1 = document.getElementById("data1").value.split("\n").map(item => item.trim());
    const data2 = document.getElementById("data2").value.split("\n").map(item => item.trim());

    // Validate input
    if (data1.length === 0 || data2.length === 0) {
        showToast("Data 1 and Data 2 cannot be empty!", "error");
        loader.style.display = "none";
        return;
    }

    // Clear table before adding new data
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    let matchCount = 0;
    let mismatchCount = 0;

    // Simulate a delay to show loading spinner
    setTimeout(() => {
        // Compare data
        data1.forEach(item1 => {
            const row = document.createElement("tr");
            const cell1 = document.createElement("td");
            cell1.textContent = item1;

            const cell2 = document.createElement("td");
            if (data2.includes(item1)) {
                cell2.textContent = item1;
                cell2.classList.add("highlight");
                matchCount++;
            } else {
                cell2.textContent = "❌";
                cell2.classList.add("missing");
                mismatchCount++;
            }

            row.appendChild(cell1);
            row.appendChild(cell2);
            tableBody.appendChild(row);
        });

        // Show count of matches and mismatches
        countMatches.innerHTML = `
            <strong>Matches:</strong> ${matchCount} | 
            <strong>Mismatches:</strong> ${mismatchCount}
        `;

        // Show success message
        showToast("Data compared successfully!", "success");

        // Hide loader
        loader.style.display = "none";
    }, 1000); // Simulate a 1-second delay
}

// Function to clear input
function clearInput() {
    document.getElementById("data1").value = "";
    document.getElementById("data2").value = "";
    document.querySelector("#dataTable tbody").innerHTML = "";
    document.getElementById("message").textContent = "";
    document.getElementById("countMatches").textContent = "";
    showToast("Input cleared!", "success");
}

// Function to export to CSV
function exportToCSV() {
    const rows = document.querySelectorAll("#dataTable tbody tr");
    if (rows.length === 0) {
        showToast("No data to export!", "error");
        return;
    }

    let csvContent = "Data 1,Data 2\n";
    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        csvContent += `${cells[0].textContent},${cells[1].textContent}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data_comparison.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Data exported to CSV!", "success");
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    showToast("Dark mode toggled!", "success");
}

// Function to show toast notification
function showToast(message, type) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show " + type;
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}