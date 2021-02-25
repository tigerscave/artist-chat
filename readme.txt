以下を順に実行してデータベースを作成

psql -f db/create_db.sql -U [username] -d postgres

psql -f db/create_rooms.sql -U [username] -d artist_chat

次に、/routes/room.js の中の
const pool = new pg.Pool({
  host: "localhost",
  database: "artist_chat",
  user: "enoki",
  port: 5432
})
のuserを書き換える