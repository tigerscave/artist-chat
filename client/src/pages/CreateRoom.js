import React, { useState, useEffect } from 'react';

const CreateRoom = () => {
  const [name, setName] = useState('NoName')
  const [datas, setDatas] = useState([])

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({name: name})
  }

  const CreateRoomButton = () => {
    fetch('http://localhost:3001/room', params)
      .then(res => res.json())
      .then()
  }

  const getRoomName = () => {
    fetch('http://localhost:3001/room', {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <>
      <h1>This is CreateRoom, {name}</h1>
      <input type="text" value={name} onChange={e => {
        e.preventDefault()
        setName(e.target.value)}}></input>
      <button onClick={CreateRoomButton}>CreateRoom</button>
      <button onClick={getRoomName}>getRoomName</button>
    </>
  )
}

export default CreateRoom;