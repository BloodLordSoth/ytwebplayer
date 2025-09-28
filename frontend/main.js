const menuBox = document.getElementById('menubox')
const menu = document.getElementById('menu')
const b1 = document.getElementById('b1')
const b2 = document.getElementById('b2')
const playlist = document.getElementById('playlist')
const vidtitle = document.getElementById('vidtitle')
const description = document.getElementById('desc')
const video = document.querySelector('video')
let fname;
let div;


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

async function fetchlist(){
    const res = await fetch('/vids', {
        method: "GET"
    })

    if (!res.ok){
        window.alert('server error')
        return
    }
    
    const datum = await res.json()
    datum.forEach(item => {
        div = document.createElement('div')
        div.classList.add('getlist')
        const id = item.id
        div.innerText = item.file_name
        playlist.appendChild(div)
        
        div.addEventListener('click', async () => {
            vidtitle.innerText = item.file_name
            description.innerText = `Description: ${item.description}`
            
            const res = await fetch(`/videos/${id}`, {
                method: "GET"
            })
            
            if (!res.ok){
                window.alert('Issue connecting to server')
                return
            }
            
            const data = await res.blob()
            const url = URL.createObjectURL(data)
            video.src = url
            
        })
    })
}
fetchlist()