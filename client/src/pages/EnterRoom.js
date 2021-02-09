import React, { useState, useEffect } from 'react';

const EnterRoom = () => {
  const [comment, setComment] = useState('2')

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(users => setComment(users.id))
  }, [])

  return <h1>This is EnterRoom, {comment}</h1>
}

export default EnterRoom;