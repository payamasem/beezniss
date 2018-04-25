import React, { Component } from "react";
import "../ProjectModal/ProjectModal.css";
import _ from 'lodash';
import { Image, Button, Item, Form, List, Header, Icon, Modal, Input, Checkbox, Dropdown } from 'semantic-ui-react';
import API from "../../utils/API";



class AddTaskModal extends Component {

  state = {
    modalOpen: false,
    heading: "",
    description: "",
    due_date: "",
    project_id: null,
    users: [],
    selectedUsers: [], 
  };

  componentWillMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    const possUsers = [];
    this.props.possible_users.map(user => {
      let uzer = {
        key: user.id,
        value: user.id,
        text: user.first_name
      }
      possUsers.push(uzer);
    });
    this.setState({
      users: possUsers
    });
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  updateUsers = (value, key) => {
    this.setState({ [key]: value });
  }


  consoleUsers = event => {
    const { value } = event.target;
    console.log('heerz the EVENT.TARGET(??) value of the input field: ', value);
    console.log('also here is state: ', this.state);
  }

  saveNewTask = () => {
    let list_item = {
      due_date: this.state.due_date,
      heading: this.state.heading,
      description: this.state.description,
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
      name: "",
      due_date: ""
    });
    this.handleClose();
    console.log('this.props = ', this.props);
  
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

    const opzioni = [
      { value: 1, text: "YESS" },
      { value: 2, text: "that is so clutch"}
    ]

    return (

      <div className="well" style={wellStyles}>
        <Modal 
          trigger={
            <Button onClick={this.handleOpen} color='olive'>Add Task</Button>
          }
          open={this.state.modalOpen}
          onClose={this.handleClose} 
          closeIcon
          >

          <Modal.Header icon='archive' as='h1'>Create a New Task</Modal.Header>

          <Modal.Content>          
            <Form>
              <Form.Field required control={Input} 
                  placeholder='task heading'
                  name="heading"
                  type="text"
                  value={this.state.heading}
                  onChange={this.handleInputChange} />
              <Form.Field required control={Input} 
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
                    <div className='item' value={user.id}>{user.first_name}</div>                  
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
                options={this.state.users}
                onChange={(event,{value}) => this.updateUsers(value, 'selectedUsers')}
                >
              </Dropdown>

              <Form.Field>
                <Form.Input 
                  required
                  label='Due Date for this Task' 
                  type='date' 
                  value={this.state.due_date}
                  onChange={event => this.setState({due_date: event.target.value})}
                />
              </Form.Field>
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
