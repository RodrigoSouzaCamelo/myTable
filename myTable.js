var table;
var header;
var body;

function constructTable(foundation) {
    this.foundation = foundation;

    table = document.createElement("table");
    header = document.createElement("thead");
    body = document.createElement("tbody");
    table.className = 'myTable';

    constructHead(foundation.colNames);
    constructBody(foundation.data);

    table.appendChild(header);
    table.appendChild(body);
    document.getElementById(foundation.table).appendChild(table);
}

function constructHead(colNames) {
    var row = document.createElement("tr");
    for (i = 0; i < colNames.length; i++) {
        var col = document.createElement("th");
        col.innerText = colNames[i];
        row.appendChild(col);
        header.appendChild(row);
    }
}

function constructBody(data) {
    for (x = 0; x < data.length; x++) {
        var row = document.createElement("tr");
        for (y = 0; y < data[x].length; y++) {
            var col = document.createElement("th");
            col.innerText = data[x][y];
            row.appendChild(col);
            body.appendChild(row);
        }
    }

}
