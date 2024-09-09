const form = document.getElementById('form');
form.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || []
    
    const isValidUser = users.find(u => u.email===email && u.password===password);

    if(!isValidUser){
        return alert('error');
    }
    
    alert(`Bienvenido `)
    
    localStorage.setItem('login_success', JSON.stringify(isValidUser))
    window.location.href = '../index.html'
}