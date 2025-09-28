const menuBox = document.getElementById('menubox')
const menu = document.getElementById('menu')
const b1 = document.getElementById('b1')
const b2 = document.getElementById('b2')


b1.addEventListener('click', () => {
    window.location.href = '/'
})

b2.addEventListener('click', () => {
    window.location.href = '/upload'
})

menu.addEventListener('mouseenter', () => {
    menuBox.style.animation = 'show 0.5s forwards'
})

document.addEventListener('click', () => {
    menuBox.style.animation = 'none'
})