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

app.get('/vids', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM videos')
        res.status(200).send(data.rows)
    }
    catch {
        res.sendStatus(500)
        console.error(e)
    }
})

app.get('/videos/:id', async (req, res) => {
    const id = req.params.id

    if (!id) return res.sendStatus(401);

    try {
        const data = await pool.query(
            'SELECT * FROM videos WHERE id = $1',
            [id]
        )
        res.set('Content-Type', data.rows[0].mime_type)
        res.status(200).send(data.rows[0].file)
    }
    catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
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