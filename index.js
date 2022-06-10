users = ['20B01A1278','20B01A1282','20B01A1284','Renuka2002'];
let b1 = document.getElementById("btn1");
b1.addEventListener("click",function(){
    let usert = document.getElementById("usernameT");
    for(let i in users){
        console.log(i)

        let row1 =
        `<tr>
        <td><button type="button"  class ='regdno' id = '${i}'>${users[i]}</button></td>
        </tr>
        `
        usert.innerHTML += row1;
    }

    let b2= document.getElementsByClassName('regdno');

    for (let i of b2){
        i.addEventListener("click", function (e) {
            // let un = document.getElementById("uname");
            // let username = un.value;
            //let username =['20B01A1278','20B01A1282','20B01A1284','Renuka2002']
           console.log(e.target.textContent)
           // console.log(users[0]);
            getdata(e.currentTarget.textContent);
            //console.log()
        });


    }
   // let b2 = document.getElementById("0");
//b2.addEventListener("click")




});
// let b2 = document.getElementById("0");
// //b2.addEventListener("click")

// b2.addEventListener("click", function () {
//     // let un = document.getElementById("uname");
//     // let username = un.value;
//     //let username =['20B01A1278','20B01A1282','20B01A1284','Renuka2002']
//     console.log(users[0]);
//     getdata(users[0]);
//     //console.log()
// });

function getdata(username) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.github.com/users/${username}`, true);
    xhr.onload = function () {
        let data = JSON.parse(this.responseText);
        console.log(this.responseText);
        displayData(data);
    }
    xhr.send();


    function displayData(data) {
        let tdata = document.getElementById("tableData");
        let gitcd = data.created_at.slice(0, 10);

        let gitud = data.updated_at.slice(0, 10);

        let row =
            `<tr>
            <td>${data.login}</td>
            <td>${data.public_repos}</td>
            <td>${dateformat(gitcd)}</td>
            <td>${dateformat(gitud)}</td>
            <td>${diffDays2(gitcd, gitud)}

            </tr>
            `
        tdata.innerHTML = row;
        repos();
    }


    function repos() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://api.github.com/users/${username}/repos`);
        xhr.onload = function () {
            let reposData = JSON.parse(this.responseText);
            //console.log(this.responseText);
            displayreposData(reposData);
        }
        xhr.send();
    }
    function displayreposData(reposData) {
        let tdata2 = document.getElementById("tableData2");
        for (let i in reposData) {
            let rcd = reposData[i].created_at.slice(0, 10);
            let rud = reposData[i].updated_at.slice(0, 10);
            let row1 =
                `<tr>
        <td><a href="https://github.com/${username}/${reposData[i].name}">${reposData[i].name}</a></td>
        <td>${reposData[i].size}</td>
        <td>${dateformat(rcd)}</td>
        <td>${dateformat(rud)}</td>
        <td>${diffDays(rud)}</td>
        </tr>
        `
            tdata2.innerHTML += row1;    
        }

        let a = document.getElementsByTagName("a");
        


        
        
    }

    
    function dateformat(date) {
        return date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4);
    }

    function monDateformat(date) {
        return date.slice(5, 7) + '/' + date.slice(8, 10) + '/' + date.slice(0, 4);
    }
    function diffDays(date) {
        let d = monDateformat(date);
        var updatedDate = new Date(d);
        var presentDate = new Date();
        var Difference_In_Days = Math.ceil((Math.abs(presentDate - updatedDate)) / (1000 * 3600 * 24));
        return Difference_In_Days;
    }

    function diffDays2(d1, d2) {
        var cday = new Date(monDateformat(d1));
        var uday = new Date(monDateformat(d2));
        var Difference_In_Days = (uday.getTime() - cday.getTime()) / (1000 * 3600 * 24);
        return Difference_In_Days;

    }


}
