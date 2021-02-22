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
let rowCount = 0;

app.post('/room', (req, res, next) => {
  const sqlCreate = "INSERT INTO rooms (name, email, delete_password) VALUES ($1, $2, crypt($3, gen_salt('bf')))"
  const values = [req.body.name, req.body.email, req.body.deletePassword]
  pool.query(sqlCreate, values)
    .then(result => {
      rowCount = result.rowCount
      if (rowCount === 0) {
        res.json("ルームの作成に失敗しました")
      } else {
        pool.query("SELECT * FROM rooms", (err, result) => {
          datas = result.rows
          res.json(datas)
        })
      }
    })
    .catch(e => console.error(e.stack))
})

app.get('/room', (req, res, next) => {
  pool.query("SELECT * FROM rooms", (err, result) => {
    datas = result.rows
    res.json(datas)
  })
})

app.delete('/room', (req, res, next) => {
  const sqlDelete = "DELETE FROM rooms WHERE id = $1 AND delete_password = crypt($2, delete_password)"
  const values = [req.body.roomID, req.body.deletePassword]
  pool.query(sqlDelete, values)
    .then(result => {
      rowCount = result.rowCount
      if (rowCount === 0) {
        res.json("パスワードが間違っています")
      } else {
        pool.query("SELECT * FROM rooms", (err, result) => {
          datas = result.rows
          res.json(datas)
        })
      }
    })
    .catch(e => console.error(e.stack))
})

module.exports = app;