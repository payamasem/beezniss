import React, { Component } from "react";
import "../AddProjectModal/AddProjectModal.css";
import _ from 'lodash';
import { Image, Button, Item, Form, Label, List, Header, Icon, Modal, Input, Checkbox, Dropdown } from 'semantic-ui-react';
import API from "../../utils/API";



class AddTaskModal extends Component {

  state = {
    modalOpen: false,
    heading: "",
    description: "",
    due_date: "",
    project_id: null,
    invalidDate: -1,
    invalidHeading: -1,
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
      invalidHeading: -1, 
      invalidDate: -1,
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
    if (this.state.heading.trim() === "") this.setState({ invalidHeading: 5, invalidDate: -1 });
    else if (this.validateDate() == false) this.setState({ invalidDate: 5, invalidHeading: -1 });    
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
    const headingValidation = { zIndex: this.state.invalidHeading };
    const dateValidation = { zIndex: this.state.invalidDate };

    return (

      <div className="well" style={wellStyles}>
        <Modal 
          trigger={
            <Button onClick={this.handleOpen} color='olive'>Add Task</Button>
          }
          open={this.state.modalOpen}
          closeIcon
          >

          <Modal.Header icon='archive' as='h1'>Create a New Task</Modal.Header>

          <Modal.Content>          
            <Form>
              <div>
                <Form.Field 
                    required 
                    control={Input} 
                    placeholder='task heading'
                    name="heading"
                    type="text"
                    value={this.state.heading}
                    onChange={this.handleInputChange} 
                />
                <Label pointing color='orange' style={headingValidation}>Task must seek to accomplish something...</Label>
              </div>
              <Form.Field 
                  required 
                  control={Input} 
                  placeholder='task description'
                  name="description"
                  type="text"
                  value={this.state.description}
                  onChange={this.handleInputChange} />
              <Form.Input className="ui fluid search dropdown">
                <input type="hidden" />
                <i className="dropdown icon"></i>
                <div className="default text">Select Task Collaborators</div>
                <div className="menu">
                {this.props.possible_users.map(user => (
                    <div 
                      className='item' 
                      value={user.id}
                      key={user.id}>{user.first_name}</div>                  
                  ))}
                </div>
              </Form.Input>

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
              <div>
                <Form.Field>
                  <Form.Input 
                    required
                    label='Due Date for this Task' 
                    type='date' 
                    value={this.state.due_date}
                    onChange={event => this.setState({due_date: event.target.value})}
                  />
                </Form.Field>
                <Label pointing color='orange' style={dateValidation}>Task must have a valid due date</Label>
              </div>
            </Form> 
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
