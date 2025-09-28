const menuBox = document.getElementById('menubox')
const menu = document.getElementById('menu')

menu.addEventListener('mouseenter', () => {
    menuBox.style.animation = 'show 0.5s forwards'
})

document.addEventListener('click', () => {
    menuBox.style.animation = 'none'
})