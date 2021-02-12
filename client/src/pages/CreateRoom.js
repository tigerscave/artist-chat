import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const CreateRoom = () => {
  const [name, setName] = useState('NoName')
  const [email, setEmail] = useState('email')
  const [deletePassword, setDeletePassword] = useState('deletePassword')
  const [rooms, setRooms] = useState([])

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      deletePassword: deletePassword,
    })
  }

  const CreateRoomButton = () => {
    fetch('http://localhost:3001/room', params)
      .then(res => res.json())
      .then()
  }

  useEffect(() => {
    fetch('http://localhost:3001/room', {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
    })
      .then(res => res.json())
      .then(data => setRooms(data))
  }, [])

  const inputRoom = (setText) => e => {
    e.preventDefault();
    setText(e.target.value);
  }

  return (
    <>
      <h1>This is CreateRoom, {name}</h1>
      <input
        type="text"
        value={name}
        onChange={inputRoom(setName)}
      ></input>
      <input
        type="text"
        value={email}
        onChange={inputRoom(setEmail)}
      ></input>
      <input
        type="text"
        value={deletePassword}
        onChange={inputRoom(setDeletePassword)}
      ></input>
      <Link to="/">to Top</Link>
      <button onClick={CreateRoomButton}>CreateRoom</button>
      <p>---rooms---</p>
      {rooms.map((room) => {
        return (
          <p key={room.id}>{room.name}</p>
        )
      })}
    </>
  )
}

export default CreateRoom;