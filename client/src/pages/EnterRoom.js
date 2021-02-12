import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom'

const EnterRoom = () => {
  const [username, setUsername] = useState('your name')
  console.log("------")
  console.log(useLocation())

  return (
    <>
      <h1>This is EnterRoom to {useLocation().state.name}</h1>
      <input type='text' value={username} onChange={(e) => {
        e.preventDefault();
        setUsername(e.target.value);
      }
      }/>
      <Link to={{
        pathname: "/ChatRoom",
        state: {
          username: username
        }
      }}>
        Enter Chat Room
      </Link>
    </>
  )
}

export default EnterRoom;