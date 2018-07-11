var table;
var header;
var body;
var pager;
var currentPage = 0;
var pageLength;
var rowNum = 5;
var backPage;
var nextPage;
var selectRowNum;

function myTable(foundation) {
    this.foundation = foundation;
    if (foundation.url) {
        requestHttp(foundation.url, foundation.data).then(function (response) {
            buildTable(response);
        }, function (error) {
            alert("Error load Table" + error);
            return;
        });
    } else if (!foundation.mockup) {
        alert("Error load Table" + error);
        return;
    } else {
        buildTable(foundation.mockup);
    }
}

function buildTable(data) {
    this.foundation.data = typeof data == "object" ? data : JSON.parse(data);
    this.pageLength = Math.ceil(foundation.data.length / rowNum);
    this.pager = document.getElementById(foundation.pager);
    this.backPage = document.createElement('a');
    this.nextPage = document.createElement('a');
    this.table = document.createElement("table");
    this.header = document.createElement("thead");
    this.body = document.createElement("tbody");
    this.selectRowNum = document.createElement("select");

    this.pager.className = "pager";
    this.table.className = "myTable";
    this.selectRowNum.className = "selectRowNum";

    for (var i = 0; i < this.pageLength; i++) {
        var option = document.createElement("option");
        option.innerText = i + 1;
        option.value = i;
        this.selectRowNum.appendChild(option);
        // this.selectRowNum.add(option, this.selectRowNum.options[i]);
    }
    this.selectRowNum.onclick = () => {
        this.currentPage = this.selectRowNum.selectedIndex;
        alterPagerEvent();
        constructTBody(foundation.data, foundation.colNames, foundation.tableDiv);
    };

    constructTHead(foundation.colNames);
    constructTBody(foundation.data, foundation.colNames, foundation.tableDiv);

    backPage.innerText = "<<";
    backPage.id = "btnBack";
    backPage.onclick = () => {
        currentPage--;
        alterPagerEvent();
        constructTBody(foundation.data, foundation.colNames, foundation.tableDiv);
    };

    nextPage.innerText = '>>';
    nextPage.id = "nextPage";
    nextPage.onclick = () => {
        currentPage++;
        alterPagerEvent();
        constructTBody(foundation.data, foundation.colNames, foundation.tableDiv);
    };

    this.pager.appendChild(backPage);
    for (var i = 0; i < this.pageLength; i++) {
        var pagerNum = document.createElement('a');
        var num = i;
        console.log("i: " + i + ", num: " + num);
        pagerNum.innerText = i + 1;
        pagerNum.id = "pager" + i;
        pagerNum.className = i == this.currentPage ? 'active' : '';
        pagerNum.onclick = function (e) {
            eventClickPager(foundation.data, foundation.colNames, foundation.tableDiv, this.innerHTML)
        };
        document.getElementById("pager").appendChild(pagerNum);
    }
    this.pager.appendChild(nextPage);

    this.table.appendChild(header);
    this.table.appendChild(body);
    document.getElementById(foundation.tableDiv).appendChild(this.selectRowNum);
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
    for (var i = 0; i < colNames.length; i++) {
        var col = document.createElement("th");
        col.innerText = colNames[i].name;
        col.setAttribute("role", i);
        col.onclick = (e) => {
            eventClickTHeadOrder(e.target, colNames[e.target.getAttribute("role")].index);
            clearRows(this.foundation.tableDiv);
            constructTBody(this.foundation.data, this.foundation.colNames, this.foundation.tableDiv);
        };
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
        if (this.foundation.data.length <= this.pageLength || this.currentPage >= Math.ceil(foundation.data.length / this.pageLength) - 1) {
            this.nextPage.disabled = true;
        }
        this.nextPage.disabled = true;
        // $('#anterior').prop('disabled', dados.length <= tamanhoPagina || pagina == 0);
        body.appendChild(row);
        table.appendChild(body);
    }
}

function alterPagerEvent() {
    for (var i = 0; i < this.pageLength; i++) {
        var numPage = document.getElementById("pager" + i);
        numPage.className = '';
    }
    var numPage = document.getElementById("pager" + this.currentPage);
    numPage.className = 'active';
}

function eventClickPager(data, colNames, tableDiv, num) {
    this.currentPage = num - 1;
    console.log(num);
    alterPagerEvent();
    constructTBody(data, colNames, tableDiv);
}

function eventClickTHeadOrder(target, index) {
    console.log(this.table);
    col = this.table.querySelector("thead");
    col = col.querySelectorAll("th");
    for (i = 0; i < col.length; i++) {
        col[i].className = "";
    }
    col = document.getElementById(index);
    target.className = "arrow-up";
    if (!(!isNaN(parseFloat(this.foundation.data[0][index])) && isFinite(this.foundation.data[0][index]))) {
        this.foundation.data.sort(function (obj1, obj2) {
            return obj1[index] < obj2[index] ? -1 :
                (obj1[index] > obj2[index] ? 1 : 0);
        });
    } else {
        this.foundation.data.sort(function (obj1, obj2) {
            return (obj1[index] - obj2[index]);
        });
    }
}

function requestHttp(url, data) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.onload = function () {
            if (request.status == 200) {
                resolve(request.responseText);
            } else {
                reject(Error(request.statusText));
            }
        }

        request.onerror = function () {
            reject(Error("Network Error"));
        }

        if (data) {
            request.open("POST", url);
            request.send(data);
        } else {
            request.open("GET", url);
            request.send();
        }

        return request.responseText;
    });
}