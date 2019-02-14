import React from "react";
import TaskManager from "./panels/TaskManager";
import SalesTracker from "./panels/SalesTracker";
import Marketing from "./panels/Marketing";
import CalendarPanel from "./panels/Calendar";
import TwitterPanel from "./panels/Twitter";
import Messenger from "./panels/Messenger";
import ConferenceCall from "./panels/VideoChat";
import "./layoutStyle.css";
import { Button, Form, Grid, Header, Message, Segment, Modal, Icon } from 'semantic-ui-react';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: true};
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
        <img src={require('./images/bee.png')} alt='logo' />
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
          New to Beezniss? <a href=''>Register Here</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>  
  );
}


// The function below displays the dashboard grid, and clicking logout will trigger a state change.
function LogoutButton(props) {
  const bgColorStyle = { backgroundColor: 'rgba(255, 189, 56, 0.89) '};

  return (
    <div className='entire'>
      <Grid celled className='mt_0 mb_0'>
        <Grid.Row color='black' className='mt_0 headerBox'>
          <Grid.Column className='headerColumn'>
            <Header as='h2' inverted className="thePageHeader"> 
                <img className='theLogo' src={require('./images/bee.png')} alt="logo" /> 
                <div className='beeznissName'>Beezniss Dashboard</div>   
            <Modal trigger={<Button style={bgColorStyle} floated='right' className='logoutBtn'><Icon name='remove user' />Logout</Button>} basic size='large'>
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
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className='hugeRow'>
        
          <Grid.Column widescreen={5} largeScreen={5} computer={5} tablet={6} mobile={16} className="primaryColumn">
            <Segment className='componentBox task_seg'>
              <TaskManager />
            </Segment>
          </Grid.Column>

          <Grid.Column widescreen={4} largeScreen={4} computer={4} tablet={5} mobile={16} className="primaryColumn">
            <Segment className='componentBox sales_seg'>
              <SalesTracker />
            </Segment>
            <Segment className='componentBox messaging_seg'>
              <Messenger />
            </Segment>
          </Grid.Column>

          <Grid.Column widescreen={4} largeScreen={4} computer={4} mobile={16} only='widescreen large screen mobile' className="primaryColumn">
            <Segment className='componentBox marketing_seg'>
              <Marketing />
            </Segment>
            <Segment className='componentBox calendar_seg'>
              <CalendarPanel />
            </Segment>
          </Grid.Column>

          <Grid.Column widescreen={3} largeScreen={3} computer={3} mobile={16} only='large screen widescreen mobile' className="primaryColumn">
            <Segment className='componentBox confcall_seg'>
              <ConferenceCall />
            </Segment>
            <Segment className='componentBox twitter_seg'>
              <TwitterPanel />
            </Segment>
          </Grid.Column>

          <Grid.Column tablet={5} only="tablet computer" className="primaryColumn">
            <Segment className='componentBox twitter_seg'>
              <TwitterPanel />
            </Segment>
          </Grid.Column>

        </Grid.Row>

        <Grid.Row className="hugeRow" columns={3} only="computer tablet">
          <Grid.Column tablet={4}>
            <Segment className='componentBox confcall_seg'>
              <ConferenceCall />
            </Segment>
          </Grid.Column>
          <Grid.Column tablet={6}>
            <Segment className='componentBox calendar_seg'>
              <CalendarPanel />
            </Segment>
          </Grid.Column>
          <Grid.Column tablet={6}>
            <Segment className='componentBox marketing_seg'>
              <Marketing />
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row textAlign='center' centered className='footer mt_0'>
          <p>© Nydia Guo, Tung Tung Ouyang, Payam Asem, Ehler Orngard, & Bill Windsor</p>
        </Grid.Row>
      </Grid>
    </div>
  );
}


export default App;
