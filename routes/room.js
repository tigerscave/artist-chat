const express = require('express');
const pg = require('pg');
const app = express();

const pool = new pg.Pool({
  host: "localhost",
  database: "artist_chat",
  user: "enoki", //設定したデータベースのユーザー名に
  port: 5432
})
pool.connect()

let datas = []

app.post('/room', function(req, res, next) {
  const sqlCreate = "INSERT INTO rooms (name, email, delete_password) VALUES ($1, $2, $3)"
  const values = [req.body.name, req.body.email, req.body.deletePassword]
  pool.query(sqlCreate, values)
  .then()
  .catch(e => console.error(e.stack))
})

app.get('/room', (req, res, next) => {
  pool.query("SELECT * FROM rooms", (err, result) => {
    datas = result.rows
    res.json(datas)
  })
})

module.exports = app;