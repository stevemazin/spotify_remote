import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <p>This is the homepage</p>
            </Route>
            <Route path="/join" component={RoomJoinPage} />
            <Route path="/create" component={CreateRoomPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}