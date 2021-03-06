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
var actionBar;
var divRowNum;
var divSearch;
var selectSearch;
var inputSearch;
var buttonSearch;

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

    buildActionBar();

    constructTHead(foundation.colNames);

    foundation.data.map(function (item) {
        var row = document.createElement("tr");
        foundation.colNames.forEach(function (name) {
            var col = document.createElement("th");
            col.innerText = item[name.index];
            row.appendChild(col);
        });

        body.appendChild(row);
        table.appendChild(body);
        item.row = row;
        return item;
    });

    constructTBody(foundation.data, foundation.colNames, foundation.tableDiv);

    constructPager();

    this.table.appendChild(header);
    this.table.appendChild(body);
    document.getElementById(foundation.tableDiv).appendChild(this.table);
}

function clearRows() {
    foundation.data.forEach(function (item) {
        item.row.style.display = "none";
    });
}

function constructTHead(colNames) {
    var row = document.createElement("tr");
    colNames.forEach(function (column) {
        var col = document.createElement("th");
        col.innerText = column.name;
        col.onclick = (e) => {
            eventClickTHeadOrder(e.target, column.index);
            clearRows(this.foundation.tableDiv);
            constructTBody(this.foundation.data, this.foundation.colNames, this.foundation.tableDiv);
        };
        row.appendChild(col);
        this.header.appendChild(row);
    });
}

function constructTBody(data, colNames, tableDiv) {
    clearRows(tableDiv);

    for (var x = currentPage * rowNum; x < data.length && x < (currentPage + 1) * rowNum; x++) {
        data[x].row.style.display = "";
        if (this.foundation.data.length <= this.pageLength || this.currentPage >= Math.ceil(foundation.data.length / this.pageLength) - 1) {
            this.nextPage.disabled = true;
        }
        this.nextPage.disabled = true;
    }
}

function constructPager() {
    this.pager.innerHTML = "";

    backPage.innerText = "<<";
    backPage.id = "btnBack";
    backPage.onclick = () => {
        if (currentPage > 0) {
            currentPage--;
            alterPagerEvent();
            constructTBody(foundation.data, foundation.colNames, foundation.tableDiv);
        }
    };

    nextPage.innerText = '>>';
    nextPage.id = "nextPage";
    nextPage.onclick = () => {
        if (currentPage < (pageLength - 1)) {
            currentPage++;
            alterPagerEvent();
            constructTBody(foundation.data, foundation.colNames, foundation.tableDiv);
        }
    };

    nextPage.className = (currentPage == (pageLength - 1)) ? "disable" : "";
    backPage.className = (currentPage == 0 && backPage) ? "disable" : "";

    this.pager.appendChild(backPage);
    for (var i = 0; i < this.pageLength; i++) {
        var pagerNum = document.createElement('a');
        pagerNum.innerText = i + 1;
        pagerNum.id = "pager" + i;
        pagerNum.className = i == this.currentPage ? 'active' : '';
        pagerNum.onclick = function (e) {
            eventClickPager(foundation.data, foundation.colNames, foundation.tableDiv, this.innerHTML)
        };
        document.getElementById("pager").appendChild(pagerNum);
    }
    this.pager.appendChild(nextPage);
}

function alterPagerEvent() {
    for (var i = 0; i < this.pageLength; i++) {
        var numPage = document.getElementById("pager" + i);
        numPage.className = '';
    }
    var numPage = document.getElementById("pager" + this.currentPage);
    numPage.className = 'active';

    nextPage.className = (currentPage == (pageLength - 1)) ? "disable" : "";
    backPage.className = (currentPage == 0 && backPage) ? "disable" : "";
}

function eventClickPager(data, colNames, tableDiv, num) {
    this.currentPage = num - 1;
    console.log(num);
    alterPagerEvent();
    constructTBody(data, colNames, tableDiv);
}

function eventClickTHeadOrder(target, index) {
    if (target.className == "" || target.className == "arrow-down") {
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
    } else {
        col = this.table.querySelector("thead");
        col = col.querySelectorAll("th");
        for (i = 0; i < col.length; i++) {
            col[i].className = "";
        }
        col = document.getElementById(index);
        target.className = "arrow-down";
        if (!(!isNaN(parseFloat(this.foundation.data[0][index])) && isFinite(this.foundation.data[0][index]))) {
            this.foundation.data.sort(function (obj1, obj2) {
                return obj1[index] < obj2[index] ? 1 :
                    (obj1[index] > obj2[index] ? -1 : 0);
            });
        } else {
            this.foundation.data.sort(function (obj1, obj2) {
                return (obj2[index] - obj1[index]);
            });
        }
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

function search() {
    buttonSearch.addEventListener('click', () => {
        var prop = this.selectSearch.value;
        var val = this.inputSearch.value;
        data.forEach(function (linha) {
            var valor = linha[prop];
            console.log((valor != null || valor != undefined));
            console.log(linha[prop].indexOf(val));
            console.log(linha[prop].indexOf(val) < 0);
            console.log((valor != null || valor != undefined) && linha[prop].indexOf(val) < 0);
            if ((valor != null || valor != undefined) && linha[prop].indexOf(val) < 0) {
                linha.row.style.display = 'none';
            }
            else {
                linha.row.style.display = "";
            }
        });
    });
}

function buildActionBar() {
    this.actionBar = document.createElement("div");
    this.divRowNum = document.createElement("div");
    this.divSearch = document.createElement("div");
    this.selectSearch = document.createElement("select");
    this.inputSearch = document.createElement("input");
    this.buttonSearch = document.createElement("button");

    for (var i = 0; i < this.foundation.rowList.length; i++) {
        var option = document.createElement("option");
        option.innerText = this.foundation.rowList[i];
        option.value = this.foundation.rowList[i];
        this.selectRowNum.appendChild(option);
        // this.selectRowNum.add(option, this.selectRowNum.options[i]);
    }

    this.selectRowNum.onchange = () => {
        this.rowNum = this.selectRowNum.options[this.selectRowNum.selectedIndex].value;
        this.pageLength = Math.ceil(foundation.data.length / rowNum);
        constructPager();
        alterPagerEvent();
        constructTBody(foundation.data, foundation.colNames, foundation.tableDiv);
    };

    this.foundation.colNames.forEach(function (item) {
        let option = document.createElement("option");
        option.innerText = item.name;
        option.value = item.index;
        selectSearch.appendChild(option);
    });

    this.buttonSearch.innerText = "Pesquisar";
    this.buttonSearch.className = "search-button";
    this.inputSearch.className = "search-input";
    this.selectSearch.className = "search-select";

    divRowNum.appendChild(this.selectRowNum);
    divSearch.appendChild(buttonSearch);
    divSearch.appendChild(inputSearch);
    divSearch.appendChild(selectSearch);

    divRowNum.className = "divRowNum";
    divSearch.className = "search";
    actionBar.className = "action-bar";


    actionBar.appendChild(divRowNum);
    actionBar.appendChild(divSearch);

    document.getElementById(this.foundation.tableDiv).appendChild(actionBar);
    search();
}