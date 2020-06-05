const express = require('express')
const cors = require('cors')
const { spawn } = require("child_process")
const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>Nodepy home page</h1>')
})

app.get('/data', async (req, res) => {
    const data = await makeRequest()
    res.json(JSON.parse(data))
})

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`Listening on port ${port}`))


const makeRequest = () => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ["request.py"]);

        let dataString = ''

        pythonProcess.stdout.on('data', (data) => {
            dataString += data.toString()
        });

        pythonProcess.on('close', (code) => {
            resolve(dataString)
        })

        pythonProcess.stdin.end()
    })
}
