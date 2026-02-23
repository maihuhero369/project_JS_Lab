function generateTable() {
    let number = document.getElementById("numberInput").value;
    let limit = document.getElementById("limitInput").value;
    let resultDiv = document.getElementById("result");

    if (number === "" || limit === "") {
        resultDiv.innerHTML = "⚠ Please enter both number and limit!";
        return;
    }

    resultDiv.innerHTML = "";

    for (let i = 1; i <= limit; i++) {
        let row = document.createElement("div");
        row.classList.add("table-row");
        row.innerHTML = `${number} × ${i} = ${number * i}`;
        resultDiv.appendChild(row);
    }
}

function clearTable() {
    document.getElementById("numberInput").value = "";
    document.getElementById("limitInput").value = "";
    document.getElementById("result").innerHTML = "";
}

// Enter key support
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        generateTable();
    }
});