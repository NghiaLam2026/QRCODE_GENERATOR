import express from "express"
import bodyParser from "body-parser"
import qr from "qr-image"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/getQrImage", (req, res) => {
    const url = req.body.userLink
    if (url === ""){
        res.sendFile(__dirname + "/index.html")
    } else {
        var qr_png = qr.image(`${url}`, { type: 'png' });
        qr_png.pipe(res)
    }
})

app.listen(port, () => {
    console.log(`Server is hosted on port ${port}`)
})