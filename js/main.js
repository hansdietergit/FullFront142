const user = JSON.parse(localStorage.getItem('login_success')) || false;
let path = './pages/';
let location = window.location.pathname;

if(location.split('/')[2] === 'pages'){
    path = '../pages/'
}

if (!user) {
    window.location.href = path + 'login.html';
}

const logout = document.getElementById('logout');

logout.onclick = () => {
    alert('sesion finalizada')
    localStorage.removeItem('login_success')
    window.location.href = path + 'login.html';
}