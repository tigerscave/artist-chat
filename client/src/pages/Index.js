import React, { useState, useEffect } from 'react';
import {withRouter, Link} from 'react-router-dom'

const Index = (props) => {
  const [comment, setComment] = useState('2')

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(res => res.json())
      .then(users => setComment(users.id))
  }, [])

  const goCreateRoom = () => {
    console.log(props)
  }

  return (
  <>
    <h1>Hello! {comment}</h1>
    <p>Go to Create Room Page</p>
    <Link to ="/CreateRoom">
      <button>Create Room</button>
    </Link>
  </>
  )
}

export default withRouter(Index);