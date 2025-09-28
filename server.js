import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import multer from 'multer'
import path from 'path'

const app = express()
const PORT = 4600
app.use(express.json())
app.use(cors())
const __file = fileURLToPath(import.meta.url)
const __dir = path.dirname(__file)
app.use(express.static(path.join(__dir, 'frontend')))
const storage = multer.memoryStorage()
const upload = multer({ storage })

app.get('/', (req, res) => {
    res.sendFile(path.join(__dir, 'frontend', 'index.html'))
})

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dir, 'frontend', 'upload.html'))
})

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
})