const form = document.getElementById('form');
form.onsubmit = (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    console.log(users);
    console.log(typeof(users));
    
    const isRegister = users.find((u) => u.email === email);

    if (isRegister) {
        return alert('error ya existe el correo')
    }

    users.push({ name: name, email: email, password: password });

    localStorage.setItem('users', JSON.stringify(users));


    window.location = './login.html'
}