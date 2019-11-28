window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        };
    }else{
        window.location.href = "index.html";
    }
    loadEmployed();
}

function loadEmployed() {
    axios.get(url + "/employed", headers).then(res => {
        console.log(res);
        displayEmployed(res.data);
    }).catch(err => {
        console.log(err);
    });
}

function displayEmployed(employed) {
    var body = document.querySelector("body");
    for (var i = 0; i < employed.length; i++) {
        body.innerHTML += `<h3>${employed[i].name}</h3>`;
    }
}