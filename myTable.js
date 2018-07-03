var table;
var header;
var body;
var page = 0;
var rowNum = 5;

function myTable(foundation) {
    this.foundation = foundation;

    table = document.createElement("table");
    header = document.createElement("thead");
    body = document.createElement("tbody");
    table.className = 'myTable';

    constructHead(foundation.colNames);
    // constructBody(foundation.data, foundation.colNames);
    Pagination(foundation.data, foundation.colNames, foundation.tableDiv);

    table.appendChild(header);
    table.appendChild(body);
    document.getElementById(foundation.tableDiv).appendChild(table);

    pager = [document.createElement('button'),document.createElement('button')];
    
    pager[0].innerText = "Próxima";
    pager[0].addEventListener("click" ,function(){
        page++; 
        Pagination(data, foundation.colNames, foundation.tableDiv); 
    });

    pager[1].innerText = "Anterior";
    pager[1].addEventListener("click" ,function(){
        page--; 
        Pagination(data, foundation.colNames, foundation.tableDiv); 
    });

    document.getElementById("pager").appendChild(pager[1]);
    document.getElementById("pager").appendChild(pager[0]);
}

function Pagination(data, colNames,tableDiv){
    clearRows(tableDiv);
    for (var x = page * rowNum; x < data.length && x < (page + 1) *  rowNum; x++) {
        var row = document.createElement("tr");
        for (y = 0; y < colNames.length; y++) {
            var col = document.createElement("th");
            col.innerText = data[x][colNames[y].index];
            row.appendChild(col);
        }

        body.appendChild(row);
        table.appendChild(body);
    }
}

function clearRows(tableDiv){
    var div = document.getElementById(tableDiv);
    var tbody = div.querySelector("tbody");
    if(tbody == null)
        return;

    body = document.createElement("tbody");
    tbody.remove();
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


