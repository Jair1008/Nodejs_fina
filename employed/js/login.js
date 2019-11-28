window.onload = init;

function init() {
    document.querySelector('.btn-primary').addEventListener('click', login);
}

function login(){
    var email = document.getElementById("input-mail").value;
    var pass = document.getElementById("input-password").value;

     axios({
  	method: 'post',
  	url: 'http://localhost:3000/employed/login',
  	data: {
    pass: pass,
    email: email
  }
}).then(res => {
	if(res.data.code == 0) {
		console.log(res.data);
		localStorage.setItem("token", res.data.message);
		window.location.href = "employed.html";
	}else if(res.data.code ==1){
		alert("Usuario o constraseña incorrectos")
	}
}).catch(err => {
	console.log(err);
});
};