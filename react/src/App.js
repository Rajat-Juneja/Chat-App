import React, { Component } from 'react';
import './App.css';
import FirstChat from './Components/Chat/First/firstchat';
import SecondChat from './Components/Chat/Second/secondchat';
import Main from './Components/Main/main';
import Auth from './Components/Main/Auth/Auth';
import {NavLink,Route,Switch,Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      // <Chat/>
      <div className="container">
      <ul>
          <li>
            <NavLink activeClassName="active" to="/main" >News</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/chatauth">Chat</NavLink>
          </li>
        </ul>

        <Switch>
          <Route path="/" exact component={Auth}></Route>
          <Route path="/main" exact component={Main}></Route>
          <Route path="/chatauth" exact component={FirstChat}></Route>
          <Route path="/chat" exact component={SecondChat}></Route>
          <Redirect to="/"/>

        </Switch>


      </div>
    );
  }
}

export default App;
