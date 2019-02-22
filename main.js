var cache = new Object();
const p1 = getJSON("theaters.json");
console.log(getData('getData'));
console.log(getData('getData'));

Promise.all([p1]).then(values => {
    for (var i = 0; i < values[0].length; i++) {
        var value = values[0][i];
        //console.log(value);
        var table = document.getElementById("dataTable");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = value["WebSite"];

        var cell2 = row.insertCell(1);
        cell2.innerHTML = value["FullName"];
    }
    console.log("done")
}, function(reason) {
    console.log("reason", reason);
});

function getJSON(url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = function () {
            try {
                if(this.status === 200 ){
                    resolve(JSON.parse(this.response));
                } else {
                    reject(this.status + " " + this.statusText);
                }
            } catch(e){
                reject(e.message);
            }
        };
        request.onerror = function () {
            reject(this.status + " " + this.statusText);
        };
        request.send();
    });
}

function getData(name) {
    if(!cache[name]) { //no data in cache
        cache[name] = new Promise(resolve => {
            setTimeout(() => resolve(42), 1000)
        }); // save data in cache
        return cache[name]
    }else{//already have data in cache
        return cache[name]
    }
}