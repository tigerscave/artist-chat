import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import Index from './pages/Index';
import CreateRoom from './pages/CreateRoom';
import EnterRoom from './pages/EnterRoom';
import ChatRoom from './pages/ChatRoom';



const App = (props) => {
  console.log('hoge')
  console.log(props)
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/CreateRoom" exact component={CreateRoom} />
        <Route path="/EnterRoom" component={EnterRoom} room={'room'}/>
        <Route path="/ChatRoom" exact component={ChatRoom} />
      </Switch>
    </div>
  )
}

export default App;
