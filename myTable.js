var table;
var header;
var body;

function myTable(foundation) {
    this.foundation = foundation;

    table = document.createElement("table");
    header = document.createElement("thead");
    body = document.createElement("tbody");
    table.className = 'myTable';

    constructHead(foundation.colNames);
    constructBody(foundation.data, foundation.colNames);

    table.appendChild(header);
    table.appendChild(body);
    document.getElementById(foundation.table).appendChild(table);
}

function constructHead(colNames) {
    var row = document.createElement("tr");
    for (i = 0; i < colNames.length; i++) {
        var col = document.createElement("th");
        col.innerText = colNames[i].name;
        row.appendChild(col);
        header.appendChild(row);
    }
}

function constructBody(data, colNames) {
    for (x = 0; x < data.length; x++) {
        var row = document.createElement("tr");
        for (y = 0; y < colNames.length; y++) {
            var col = document.createElement("th");
            col.innerText = data[x][colNames[y].index];
            row.appendChild(col);
        }

        body.appendChild(row);
    }

}
