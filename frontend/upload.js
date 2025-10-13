const menuBox = document.getElementById('menubox')
const menu = document.getElementById('menu')
const b1 = document.getElementById('b1')
const b2 = document.getElementById('b2')
const upload = document.getElementById('uploadvideo')
const filename = document.getElementById('filename')
const file = document.getElementById('file')
const description = document.getElementById('description')
const success = document.getElementById('success')
const form = document.getElementById('form')

async function submit(){
    if (!file.files || file.files.length === 0 || filename.value.length === 0 || description.value.length === 0){
        window.alert('All fields must be completed')
        return
    }
    
    const formData = new FormData()
    formData.append('video', file.files[0])
    formData.append('name', filename.value)
    formData.append('description', description.value)
    const res = await fetch('/upload', {
        method: "POST",
        body: formData
    })

    if (!res.ok){
        window.alert('There was a server error')
        return
    }

    success.style.display = 'inline'
    setTimeout(() => {
        success.style.display = 'none'
        window.location.href = '/'
    }, 2000)

}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    submit()
})

b1.addEventListener('click', () => {
    window.location.href = '/'
})

b2.addEventListener('click', () => {
    window.location.href = '/upload'
})

menu.addEventListener('click', () => {
    menuBox.style.animation = 'show 0.5s forwards'
    menuBox.style.display = 'flex'
})
