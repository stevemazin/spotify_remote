import React, { Component } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
  }

  updateshowSettings = (value) => {
    this.setState({
      showSettings: value,
    });
  };

  renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.updateshowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };

  renderSettingsPage = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            roomCode={this.roomCode}
            guestCanPause={this.state.guestCanPause}
            votesToSkip={this.state.votesToSkip}
            updateCallback={this.getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            onClick={() => this.updateshowSettings(false)}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  leaveBtnPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_res) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });
  };

  getRoomDetails = () => {
    // This method fetches data  about a single room from the backend
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  };
  render() {
    if (this.state.showSettings) {
      return this.renderSettingsPage();
    }
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h5" component="h5">
            Code: {this.roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h5" component="h5">
            Votes: {this.state.votesToSkip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h5" component="h5">
            Guest Can Pause: {this.state.guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h5" component="h5">
            Host: {this.state.isHost.toString()}
          </Typography>
        </Grid>
        {this.state.isHost ? this.renderSettingsButton() : null}
        <Grid item xs={12} align="center">
          <Button
            onClick={this.leaveBtnPressed}
            variant="contained"
            color="secondary"
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}
