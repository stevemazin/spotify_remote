import React, { Component } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.code);
        this.setState({
          roomCode: data.code,
        });
      });
  }

  renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid xs={12} item align="center">
          <Typography variant="h3" component="h3">
            House Party
          </Typography>
        </Grid>
        <Grid xs={12} item align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };

  clearRoomCode = () => {
    this.setState({
      roomCode: null,
    });
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return this.state.roomCode ? (
                  <Redirect to={`/room/${this.state.roomCode}`} />
                ) : (
                  this.renderHomePage()
                );
              }}
            >
              {}
            </Route>
            <Route path="/join" component={RoomJoinPage} />
            <Route path="/create" component={CreateRoomPage} />
            <Route
              path="/room/:roomCode"
              render={(props) => {
                return (
                  <Room {...props} leaveRoomCallback={this.clearRoomCode} />
                );
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
