import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskManager from "./panels/TaskManager";
import SalesTracker from "./panels/SalesTracker";
import Marketing from "./panels/Marketing";
import TwitterPanel from "./panels/Twitter";
import Messages from "./panels/Messenger";
import NewsScraper from "./panels/NewsScraper";
import NoMatch from "./panels/NoMatch";
import Header from "./components/Header";
import {Grid, Image} from 'semantic-ui-react'

const App = () => (
    <div>
    <Header />
    <Grid divided>
    <Grid.Row color='grey' columns={2}>
    <Grid.Column>
      <TaskManager />
    </Grid.Column>
    <Grid.Column>
      <SalesTracker />
    </Grid.Column>
    </Grid.Row>


    <Grid.Row columns={3}>
      <Grid.Column>
        Insert Calendar Widget here...
      </Grid.Column>
      <Grid.Column>
        Insert Stock Market Widget here...
      </Grid.Column>
      <Grid.Column>
        <Marketing />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row color='grey' columns={3}>
      <Grid.Column>
        Insert Google News Widget here...
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
