var container = document.getElementById("table-container");
var table = document.createElement("table");
for (var i = 0; i < 3; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 3; j++) {
        var cell = document.createElement("td");
        cell.textContent = "Row " + (i + 1) + ", Cell " + (j + 1);
        row.appendChild(cell);
    }
    table.appendChild(row);
}
container.appendChild(table);