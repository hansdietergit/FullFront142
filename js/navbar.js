document.getElementById('menu-toggle').addEventListener('click', function () {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});

function name(params) {
    let m = document.getElementById('menu-toggle')
    let na = document.getElementById('nav-links')

    let posTop = m.getBoundingClientRect().top + m.offsetHeight
    let posRight = m.getBoundingClientRect().right 

    na.style.top = posTop + 'px'

    na.style.right = posRight + 'px'
}