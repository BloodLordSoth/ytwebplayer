import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import multer from 'multer'
import path from 'path'
import pool from './schema.js'

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

app.post('/upload', upload.single('video'), async (req, res) => {
    if (!req.file) return res.sendStatus(401);

    const { name, description } = req.body

    try {
        await pool.query(
            'INSERT INTO videos (file, file_name, mime_type, description) VALUES ($1, $2, $3, $4)',
            [req.file.buffer, name, req.file.mimetype, description]
        )
        res.sendStatus(200)
    }
    catch (e) {
        res.sendStatus(500)
        console.error(e)
    }
})

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
})