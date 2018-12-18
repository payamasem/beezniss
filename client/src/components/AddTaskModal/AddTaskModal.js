import React, { Component } from "react";
import "../CSS/Modal.css";
import { Grid, Button, Form, Label, Modal, Input, Dropdown } from 'semantic-ui-react';
import API from "../../utils/API";


class AddTaskModal extends Component {

  state = {
    modalOpen: false,
    heading: "",
    description: "",
    due_date: "",
    project_id: null,
    invalidDate: 0,
    invalidHeading: 0,
    selectedUsers: [], 
    possibleUsers: [],
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    const possUsers = [];
    // console.log('props.possibleUsers : ', this.props.possible_users);
    this.props.possible_users.map(user => {
      let uzer = {
        key: user.id,
        value: user.id,
        text: user.first_name
      }
      possUsers.push(uzer);
    });
    this.setState({
      possibleUsers: possUsers
    });
  }

  handleOpen = () => {
    this.loadUsers();
    this.setState({ modalOpen: true });
  }
  handleClose = () => {
    this.setState({ 
      modalOpen: false, 
      invalidHeading: 0, 
      invalidDate: 0,
      heading: "",
      description: "",
      selectedUsers: [],
      due_date: "",
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

  saveNewTask = () => {
    if (this.state.heading.trim() === "") this.setState({ invalidHeading: 1, invalidDate: 0 });
    else if (this.validateDate() === false) this.setState({ invalidDate: 1, invalidHeading: 0 });    
    else {
      console.log('about to be saved, selectedUsers : ', this.state.selectedUsers);
      let list_item = {
        due_date: this.state.due_date,
        heading: this.state.heading.trim(),
        description: this.state.description.trim(),
        users: this.state.selectedUsers,
        project_id: this.props.project_id
      }
      API.createTask(list_item)
        .then(res => {
          console.log('res from creating task = ', res.data)
          this.props.onClose();
        })
        .catch(err => console.log(err));
      this.setState({
        heading: "",
        description: "",
        selectedUsers: [],
        due_date: ""
      });

      this.handleClose();
      console.log('this.props = ', this.props);
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });

    console.log('possible_users: ', this.props.possible_users);

  };
              

  render() {
    // console.log("this is modal props:", this.props.tasks.project)
    const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};
    const headingValidation = { opacity: this.state.invalidHeading, transition: "opacity 1.8s" };
    const dateValidation = { opacity: this.state.invalidDate, transition: "opacity 1.8s" };

    return (

      <div className="well" style={wellStyles}>
        <Modal 
          trigger={<Button 
            onClick={this.handleOpen} 
            className='addProjectButton'>Add Task</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose} 
          className="theModal"
          >

          <Modal.Header icon='archive' as='h1' className="createanewproject">Add a New Task</Modal.Header>

          <Modal.Content>          
            <Grid divided="vertically" >
              <Grid.Row className="modalRow">
                <Grid.Column width={3}>
                  <div className="labels">Task heading</div>
                </Grid.Column>
                <Grid.Column width={5} className="inputsColumn">
                  <div>
                    <Form.Field 
                        required 
                        control={Input}
                        name="heading"
                        type="text"
                        className="headingAsInput"
                        value={this.state.heading}
                        onChange={this.handleInputChange} 
                    />
                    <Label pointing color='orange' style={headingValidation}>Task must seek to accomplish something</Label>
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
                  <div className="labels">Task description</div>
                </Grid.Column>
                <Grid.Column width={13} className="inputsColumn">
                  <div>
                    <Form.Field 
                        required 
                        control={Input}
                        name="description"
                        type="text"
                        className="descriptionAsInput"
                        value={this.state.description}
                        onChange={this.handleInputChange} 
                    />
                  </div>
                  <div className="finePrint italicized">
                    * If you'd like to add checklist items to the task, click on the task in the list to edit after creating it.
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
                    options={this.state.possibleUsers}
                    onChange={(event,{value}) => this.updateUsers(value, 'selectedUsers')}
                    >
                  </Dropdown>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>

          <Modal.Actions>
            <Button color='black' onClick={this.handleClose}>Discard</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={this.saveNewTask} />
          </Modal.Actions>
        </Modal> 
      </div>

    );
  }
}


export default AddTaskModal;
