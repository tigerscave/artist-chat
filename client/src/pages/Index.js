import React, { useState, useEffect } from 'react';
import {withRouter, Link} from 'react-router-dom'

const Index = (props) => {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }
    fetch('http://localhost:3001/room', params)
      .then(res => res.json())
      .then(data => {
        setRooms(data)
      })
  }, [])

  const onDeleteButtonClick = (id) => () => {
    const deletePassword = prompt('削除用パスワードを入力してください', 'deletePassword')
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        roomID: id,
        deletePassword
      })
    }

    fetch('http://localhost:3001/room', params)
      .then(res => res.json())
      .then(data => {
        if (typeof(data) === "string") {
          alert(data)
        } else {
          setRooms(data)
        }
      })
  }

  return (
  <>
    <h1>Hello!</h1>
    {rooms.map(room => {
      return (
      <p key={room.id}>
        <Link to={{
          pathname: "/EnterRoom",
          state: {
            id: room.id,
            name: room.name
          }
        }}>
          {room.name}
        </Link>
        <button onClick={onDeleteButtonClick(room.id)} key={room.id}>削除</button>
      </p>
      )
    })}
    <p>Go to Create Room Page</p>
    <Link to="/CreateRoom">
      <button>Create Room</button>
    </Link>
  </>
  )
}

export default withRouter(Index);