

import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 4000

const db = mysql.createConnection({
   host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_DATABASE,
})

db.connect(function (err) {
    if (err) (console.log('Connecting error.'))
    else { console.log('Connected Successfully') }
})

app.get('/registerdata', (req, res) => {
    const sql = 'SELECT * FROM register'
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: 'Error. cannot connected' })
        return res.json(result);
    })
})

app.post('/register', (req, res) => {
    const { name,mail,mobile } = req.body;
    const sql = 'INSERT INTO register (name,mail,mobile) VALUES (?, ?, ?)';
    db.query(sql, [name,mail,mobile], (err, result) => {
        if (err) {
            res.status(500).send('Form cannot submitted.')
            console.log(err)
            throw err;
        } else {
            res.send('Claim Data Submmited Successfully.')
        }
    })
})


app.listen(PORT, () => {
    console.log('Listening Successfully')
})
