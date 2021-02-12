import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom'

const EnterRoom = () => {
  console.log("------")
  console.log(useLocation())

  return <h1>This is EnterRoom to {useLocation().state.name}</h1>
}

export default EnterRoom;