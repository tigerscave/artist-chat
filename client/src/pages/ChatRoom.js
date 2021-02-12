import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom'
import io from 'socket.io-client'

const ChatRoom = () => {
  const [message, setMessage] = useState('')

  const username = useLocation().state.username
  const socket = io('localhost:3001');
  const onSendButton = () => {
    socket.emit('SEND_MESSAGE', {
      user: username,
      text: message
    })
  }
  socket.on('RECEIVE_MESSAGE', (data) => {
    console.log(data)
  })

  return (
    <>
      <h1>This is ChatRoom, {username} {message}</h1>
      <input type='text' onChange={(e) => setMessage(e.target.value)}></input>
      <button onClick={onSendButton}>Send message</button>
    </>
  )
}

export default ChatRoom;