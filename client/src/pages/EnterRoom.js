import React, { useState} from 'react';
import {Link, useLocation} from 'react-router-dom'

const EnterRoom = () => {
  const [username, setUsername] = useState('your name')
  const room = useLocation().state.name
  const roomID = useLocation().state.id

  return (
    <>
      <h1>This is EnterRoom to {room}</h1>
      <input type='text' value={username} onChange={(e) => {
        e.preventDefault();
        setUsername(e.target.value);
      }
      }/>
      <Link to={{
        pathname: "/ChatRoom",
        state: {
          username, room, roomID
        }
      }}>
        Enter Chat Room
      </Link>
    </>
  )
}

export default EnterRoom;