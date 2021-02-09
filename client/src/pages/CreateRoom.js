import React, { useState, useEffect } from 'react';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState({name: 'Mozart'})

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(roomName)
  }

  useEffect(() => {
    fetch('http://localhost:3001/create', params)
      .then(res => res.json())
      .then(console.log("Create Room!"))
  }, [])

  return <h1>This is CreateRoom, {roomName.name}</h1>
}

export default CreateRoom;