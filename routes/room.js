const express = require('express');
const pg = require('pg');
const app = express();
const bcrypt = require('bcrypt')

const saltRounds = 5;

const pool = new pg.Pool({
  host: "localhost",
  database: "artist_chat",
  user: "enoki", //設定したデータベースのユーザー名に
  port: 5432
})
pool.connect()

let datas = []
let rowCount = 0;

app.post('/room', async (req, res, next) => {
  const sqlCreate = "INSERT INTO rooms (name, email, delete_password) VALUES ($1, $2, $3)"
  const name = req.body.name;
  const email = req.body.email;
  const hashedDeletePassword = await bcrypt.hash(req.body.deletePassword, saltRounds)
  const values = [
    name,
    email,
    hashedDeletePassword
  ]
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
  const deletePassword = req.body.deletePassword;
  const sqlGet = "SELECT * FROM rooms WHERE id = $1"
  const roomID = req.body.roomID

  pool.query(sqlGet, [roomID])
    .then(async result => {
      const compared = await bcrypt.compare(deletePassword, result.rows[0].delete_password);

      if (compared) {
        const sqlDelete = "DELETE FROM rooms WHERE id = $1";
        pool.query(sqlDelete, [roomID])
        .then(result => {
          pool.query("SELECT * FROM rooms", (err, result) => {
            datas = result.rows
            res.json(datas)
          })
        })
        .catch(e => console.error(e.stack))
      } else {
        res.json('パスワードが間違っています')
      }
    })
})

module.exports = app;