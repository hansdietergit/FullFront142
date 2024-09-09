const user = JSON.parse(localStorage.getItem('login_success')) || false;
let path = '/pages/';
let locationPath = window.location.pathname;

if(locationPath.split('/')[2] === 'pages'){
    path = '/'
}
let url = path + 'login.html';

if (!user) {
    window.location.pathname = url;
}

const logout = document.getElementById('logout');

logout.onclick = () => {
    alert('sesion finalizada')
    localStorage.removeItem('login_success')
    window.location.pathname = url;
}