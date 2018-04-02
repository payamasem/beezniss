import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskManager from "./panels/TaskManager";
import SalesTracker from "./panels/SalesTracker";
import Marketing from "./panels/Marketing";
import Messenger from "./panels/Messenger";
import NewsScraper from "./panels/NewsScraper";
import NoMatch from "./panels/NoMatch";
import Nav from "./components/Nav";

const App = () => (
    <div>
      <Nav />
      <TaskManager />
{      // <SalesTracker />		
     // <NewsScraper />		
      // <Marketing />		
      // <Messenger />		
   }
    </div>
);

export default App;
