import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom'
import io from 'socket.io-client'
const socket = io('localhost:3001');

const ChatRoom = () => {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const {username, room, roomID} = useLocation().state

  useEffect(() => {
    socket.on('RECEIVE_MESSAGE', data => {
      console.log(data)
      setChat(prevChat => ([...prevChat, data]))
    })

    socket.emit("JOIN", {
      user: username,
      room: room,
      roomID: roomID,
      text: "- " + username + " joins -"
    })
  }, [])

  const onSendButton = () => {
    socket.emit('SEND_MESSAGE', {
      user: username,
      room: room,
      roomID: roomID,
      text: message
    })
  }

  return (
    <>
      <h1>This is ChatRoom, {username} {message}</h1>
      <input type='text' onChange={(e) => setMessage(e.target.value)}></input>
      <button onClick={onSendButton}>Send message</button>
      {chat.map(messages => {
      return (
      <p>
          {messages.text}
      </p>
      )
    })}
    </>
  )
}

export default ChatRoom;