import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom'

const ChatRoom = () => {
  const username = useLocation().state.username


  return <h1>This is ChatRoom, {username}</h1>
}

export default ChatRoom;