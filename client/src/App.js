import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [comment, setComment] = useState('2')

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(users => setComment(users.id))
  }, [])

  return <h1>Hello! {comment}</h1>
}

export default App;
