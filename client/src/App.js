import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskManager from "./panels/TaskManager";
import SalesTracker from "./panels/SalesTracker";
import Marketing from "./panels/Marketing";
import CalendarPanel from "./panels/Calendar";
import TwitterPanel from "./panels/Twitter";
import Messenger from "./panels/Messenger";
import Footer from "./panels/Footer";
import NoMatch from "./panels/NoMatch";
import ConferenceCall from "./panels/VideoChat";
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon } from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}


function UserGreeting(props) {
  return null;
}

function GuestGreeting(props) {
  return null;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />
  }
  return <GuestGreeting />;
}


// The function below displays the login page, and clicking login will change state.
function LoginButton(props) {
  return (
    <div className='login-form'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column color='black' style={{ maxWidth: 450 }}>
        <Header as='h2' color='yellow' textAlign='center'>
        <img src={require('./logo.png')} alt='logo' />
          Welcome to Beezniss!
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Username'
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
  <Button color='yellow' fluid size='large' onClick={props.onClick}>Login</Button>
          </Segment>
        </Form>
        <Message>
          New to Beezniss? <a href='#'>Register Here</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>  
  );
}


// The function below displays the dashboard grid, and clicking logout will trigger a state change.
function LogoutButton(props) {
  return (
    <div>
  <Grid celled>
  <Grid.Row color='black' columns={1}>
  <Grid.Column>
  <Segment inverted>
              <Header as='h2' dividing inverted color='yellow'> <img src={require('./logo.png')} alt="logo" /> Beezniss Dashboard    
              <Modal trigger={<Button color='yellow' icon='remove user' content='Logout' floated='right' />} basic size='small'>
    <Header icon='remove user' content='Logout?' />
    <Modal.Content>
      <p>Do you wish to logout of your Beezniss Dashboard?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted onClick={props.onClick}>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
 </Header>
</Segment>
  </Grid.Column>
  </Grid.Row>

  <Grid.Row color='grey' columns={3}>
  <Grid.Column width='3'>
    <CalendarPanel />
  </Grid.Column>
  <Grid.Column width='8'>
    <TaskManager />
  </Grid.Column>
  <Grid.Column width='5'>
    <Marketing />
  </Grid.Column>
  </Grid.Row>

  <Grid.Row color='black' columns={4}>
    <Grid.Column width='4'>
      <SalesTracker />
    </Grid.Column>
    <Grid.Column width='4'>
      <TwitterPanel />
    </Grid.Column>
    <Grid.Column width='4'>
      <Messenger />
    </Grid.Column>
    <Grid.Column width='4'>
      <ConferenceCall />
    </Grid.Column>
  </Grid.Row>

  <Grid.Row color='grey' centered columns={1}>
  <Grid.Column textAlign='center'>
    <Footer />
  </Grid.Column>
  </Grid.Row>
  </Grid>
  </div>
  );
}


export default App;
