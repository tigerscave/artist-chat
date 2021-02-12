import React, { useState, useEffect } from 'react';
import {withRouter, Link} from 'react-router-dom'

const Index = (props) => {
  const [rooms, setRooms] = useState([])

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  }

  useEffect(() => {
    fetch('http://localhost:3001/room', params)
      .then(res => res.json())
      .then(data => setRooms(data))
    }, [])
    
    console.log(rooms)
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