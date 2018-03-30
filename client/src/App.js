import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskManager from "./panels/TaskManager";
import SalesTracker from "./panels/SalesTracker";
import Marketing from "./panels/Marketing";
import SocialMedia from "./panels/SocialMedia";
import Messages from "./panels/Messenger";
import NewsScraper from "./panels/NewsScraper";
import NoMatch from "./panels/NoMatch";
import Header from "./components/Header";
import {Grid, Image} from 'semantic-ui-react'

const App = () => (
    <div>
    <Header />
    <Grid divided>
    <Grid.Row color='grey' columns={1}>
    <Grid.Column>
      <TaskManager />
    </Grid.Column>
    </Grid.Row>


    <Grid.Row columns={2}>
      <Grid.Column>
        <Marketing />
      </Grid.Column>
      <Grid.Column>
        <SalesTracker />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row color='grey' columns={1}>
      <Grid.Column>
        <SocialMedia />
      </Grid.Column>
      </Grid.Row>


    <Grid.Row color='black' columns={1}>
      <Grid.Column>
         <Messages />
      </Grid.Column>
    </Grid.Row>
    </Grid>
    </div>
);

export default App;
