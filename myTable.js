var table;
var header;
var body;
var pager;
var currentPage = 0;
var pageLength;
var rowNum = 5;
var backPage;
var nextPage;

function myTable(foundation) {
    this.foundation = foundation;
    this.pageLength = Math.ceil(foundation.data.length / rowNum);
    this.pager = document.getElementById(foundation.pager);
    this.backPage = document.createElement('a');
    this.nextPage = document.createElement('a');
    this.table = document.createElement("table");
    this.header = document.createElement("thead");
    this.body = document.createElement("tbody");

    this.pager.className = "pager";
    this.table.className = 'myTable';

    constructTHead(foundation.colNames);
    constructTBody(foundation.data, foundation.colNames, foundation.tableDiv);

    backPage.innerText = "<<";
    backPage.addEventListener("click", function () {
        currentPage--;
        alterPagerEvent();
        constructTBody(data, foundation.colNames, foundation.tableDiv);
    });

    nextPage.innerText = '>>';
    nextPage.addEventListener("click", function () {
        currentPage++;
        alterPagerEvent();
        constructTBody(data, foundation.colNames, foundation.tableDiv);
    });
    
    this.pager.appendChild(backPage);
    for (i = 0; i < this.pageLength; i++) {
        var pagerNum = document.createElement('a');
        pagerNum.innerText = i + 1;
        pagerNum.id = "pager" + i;
        pagerNum.className = i == this.currentPage ? 'active' : '';
        document.getElementById("pager").appendChild(pagerNum);
    }
    this.pager.appendChild(nextPage);
    
    this.table.appendChild(header);
    this.table.appendChild(body);
    document.getElementById(foundation.tableDiv).appendChild(this.table);
}



function clearRows(tableDiv) {
    var div = document.getElementById(tableDiv);
    var tbody = div.querySelector("tbody");
    if (tbody == null)
        return;

    body = document.createElement("tbody");
    tbody.remove();
}

function constructTHead(colNames) {
    var row = document.createElement("tr");
    for (i = 0; i < colNames.length; i++) {
        var col = document.createElement("th");
        col.innerText = colNames[i].name;
        row.appendChild(col);
        this.header.appendChild(row);
    }
}

function constructTBody(data, colNames, tableDiv) {
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

function alterPagerEvent() {
    for(i = 0; i < this.pageLength; i++){
        var numPage = document.getElementById("pager" + i);
        numPage.className = '';
    }
    numPage = document.getElementById("pager" + this.currentPage);
    numPage.className = 'active';
}