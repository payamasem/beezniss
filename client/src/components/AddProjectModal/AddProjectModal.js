import React, { Component } from "react";
import "../CSS/Modal.css";
import { Grid, Dropdown, Button, Label, Form, Header, Modal, Input } from 'semantic-ui-react';
import API from "../../utils/API";

class AddProjectModal extends Component {

  state = {
    modalOpen: false,
    name: "",
    due_date: "",
    selectedUsers: [],
    possible_users: [],
    invalidName: 0,
    invalidDate: 0,
  };

  componentWillMount() {
    this.loadUsers();
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ 
    modalOpen: false, 
    invalidName: 0, 
    invalidDate: 0, 
    name: "",
    due_date: "",
    selectedUsers: [],
  });

  loadUsers = () => {
    let userray = [];
    this.props.users.map(user => {
      let newUser = {
        key: user.id,
        value: user.id,
        text: user.first_name
      }
      userray.push(newUser);
      this.setState({ possible_users: userray });
      console.log('possible_users: ', this.state.possible_users);
    });
  }

  updateUsers = (value, key) => {
    this.setState({ [key]: value });
  }

  validateDate = () => {
    let dateArray = this.state.due_date.split("-");
    if (dateArray.length !== 3) return false;
    console.log("dateArray: ", dateArray);
    dateArray.forEach((el, i) => {
      console.log('typeof parseInt(el) ', typeof parseInt(el));
      dateArray[i] = parseInt(el);
      if (typeof parseInt(el) !== "number") return false;
    });
    if (dateArray[0] > 2099 || dateArray[0] < 2018) return false;
    return true;
  }

  saveNewProject = () => {
    if (this.state.name.trim() === "") this.setState({ invalidName: 1 });
    else if (this.validateDate() == false) this.setState({ invalidDate: 1, invalidName: 0 });
    else {
      let list_item = {
        due_date: this.state.due_date,
        name: this.state.name,
        users: this.state.selectedUsers
      }
      API.createProject(list_item)
        .then(res => {
          console.log('res from creating project = ', res.data)
          this.props.onClose();
        })
        .catch(err => console.log(err));
      this.setState({
        name: "",
        due_date: "",
        selectedUsers: []
      });
      this.handleClose();
      this.setState({ invalidDate: 0, invalidName: 0 })
    }
  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
  };

  render() {
    const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};
    const nameValidation = { opacity: this.state.invalidName, transition: "opacity 1.8s" };
    const dateValidation = { opacity: this.state.invalidDate, transition: "opacity 1.8s" };

    return (

      <div className="well" style={wellStyles}>
        <Modal 
          trigger={<Button 
            onClick={this.handleOpen} 
            className='addProjectButton'>Add Project</Button>}
          open={this.state.modalOpen}
          onOpen={this.loadUsers}
          onClose={this.handleClose} 
          className="theModal"
          >

          <Modal.Header icon='archive' as='h1' className="createanewproject">Create a New Project</Modal.Header>

          <Modal.Content>          
            <Grid divided="vertically" >
              <Grid.Row className="modalRow">
                <Grid.Column width={3}>
                  <div className="labels">Name of the project</div>
                </Grid.Column>
                <Grid.Column width={5} className="inputsColumn">
                  <div>
                    <Form.Field 
                        required 
                        control={Input}
                        name="name"
                        type="text"
                        className="headingAsInput"
                        value={this.state.name}
                        onChange={event => this.setState({name: event.target.value})} 
                    />
                    <Label pointing color='orange' style={nameValidation}>Project must have a name</Label>
                  </div>
                </Grid.Column>
                <Grid.Column width={3}>
                  <div className="labels">Due date for this project</div>
                </Grid.Column>
                <Grid.Column width={5} className="inputsColumn">
                  <div>
                    <Form.Field>
                      <Form.Input 
                        required
                        className="dateAsInput"
                        type='date'
                        value={this.state.due_date}
                        onChange={event => this.setState({due_date: event.target.value})}
                      />
                    </Form.Field>
                    <Label pointing color='orange' style={dateValidation}>Project must have a valid date</Label>
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="modalRow">
                <Grid.Column width={3}>
                  <div className="labels">Project collaborators</div>
                </Grid.Column>
                <Grid.Column width={13} className="inputsColumn">
                  <Dropdown 
                    className='userDropdown'
                    placeholder='Select...' 
                    selection
                    search
                    multiple
                    value={this.state.selectedUsers}
                    options={this.state.possible_users}
                    onChange={(event,{value}) => this.updateUsers(value, 'selectedUsers')}
                    >
                  </Dropdown>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>

          <Modal.Actions>
            <Button color='black' onClick={this.handleClose}>Discard</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={this.saveNewProject} />
          </Modal.Actions>
        </Modal> 
      </div>
    );
  }
}


export default AddProjectModal;
