var table;
var header;
var body;
var pager;
var currentPage = 0;
var pageLength;
var rowNum = 5;

function myTable(foundation) {
    this.foundation = foundation;
    this.pageLength = Math.ceil(foundation.data.length / rowNum);
    this.pager = document.getElementById(foundation.pager);
    this.pager.className = "pager";

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


    var backPage = document.createElement('a');
    backPage.innerText = "<<";
    backPage.addEventListener("click", function () {
        currentPage--;
        alterPagerEvent();
        Pagination(data, foundation.colNames, foundation.tableDiv);
    });
    this.pager.appendChild(backPage);
    for (i = 0; i < this.pageLength; i++) {
        var pagerNum = document.createElement('a');
        pagerNum.innerText = i + 1;
        pagerNum.id = "pager" + i;
        pagerNum.className = i == this.currentPage ? 'active' : '';
        document.getElementById("pager").appendChild(pagerNum);
    }
    var nextPage = document.createElement('a');
    nextPage.innerText = '>>';
    nextPage.addEventListener("click", function () {
        currentPage++;
        alterPagerEvent();
        Pagination(data, foundation.colNames, foundation.tableDiv);
    });
    this.pager.appendChild(nextPage);
}

function Pagination(data, colNames, tableDiv) {
    clearRows(tableDiv);
    for (var x = currentPage * rowNum; x < data.length && x < (currentPage + 1) * rowNum; x++) {
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

function clearRows(tableDiv) {
    var div = document.getElementById(tableDiv);
    var tbody = div.querySelector("tbody");
    if (tbody == null)
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

function alterPagerEvent() {
    for(i = 0; i < this.pageLength; i++){
        var numPage = document.getElementById("pager" + i);
        numPage.className = '';
    }
    numPage = document.getElementById("pager" + this.currentPage);
    numPage.className = 'active';
}