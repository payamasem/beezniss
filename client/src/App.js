import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskManager from "./panels/TaskManager";
import SalesTracker from "./panels/SalesTracker";
import Marketing from "./panels/Marketing";
import CalendarPanel from "./panels/Calendar";
import TwitterPanel from "./panels/Twitter";
import Messages from "./panels/Messenger";
import NoMatch from "./panels/NoMatch";
import Header from "./components/Header";
import {Grid, Image} from 'semantic-ui-react';
import ConferenceCall from "./panels/VideoChat";

const App = () => (
    <div>
    <Grid divided>
    <Grid.Row color='black' columns={1}>
    <Grid.Column>
      <Header />
    </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={2}>
    <Grid.Column>
      <TaskManager />
    </Grid.Column>
    <Grid.Column>
      <SalesTracker />
    </Grid.Column>
    </Grid.Row>


    <Grid.Row color='grey' columns={3}>
      <Grid.Column>
        <CalendarPanel />
      </Grid.Column>
      <Grid.Column>
        <Marketing />
      </Grid.Column>
      <Grid.Column>
        <ConferenceCall />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row color='black' columns={3}>
      <Grid.Column>
        Insert map chart for sales data here...
      </Grid.Column>
      <Grid.Column>
        <TwitterPanel />
      </Grid.Column>
      <Grid.Column>
        <Messages />
      </Grid.Column>
      </Grid.Row>
    </Grid>
    </div>
);

export default App;
