import React, { Component } from "react";
import "./AddProjectModal.css";
import _ from 'lodash';
import { Image, Dropdown, Button, Item, Form, List, Header, Icon, Modal, Input, Checkbox } from 'semantic-ui-react';
import API from "../../utils/API";
import TaskManager from "../../panels/TaskManager/TaskManager.js";

class AddProjectModal extends Component {

  state = {
    modalOpen: false,
    name: "",
    due_date: "",
    selectedUsers: [],
    possible_users: []
  };

  componentWillMount() {
    this.loadUsers();
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

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

  saveNewProject = () => {
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
    console.log('this.props = ', this.props);
  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
  };

  render() {
    // console.log("this is modal props:", this.props.tasks.project)
    const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};

    return (

      <div className="well" style={wellStyles}>
        <Modal 
          trigger={<Button onClick={this.handleOpen} className='addProjectButton'>Add Project</Button>}
          open={this.state.modalOpen}
          onOpen={this.loadUsers}
          onClose={this.handleClose} 
          closeIcon
          >

          <Modal.Header icon='archive' as='h1'>Create a New Project</Modal.Header>

          <Modal.Content>          
            <Form>
              <Form.Field required control={Input} 
                  label='Name of the project'
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({name: event.target.value})} />
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
              <Form.Field>
                <Form.Input 
                  required
                  label='Due date for this project' 
                  type='date' 
                  value={this.state.due_date} 
                  onChange={event => this.setState({due_date: event.target.value})}
                />
              </Form.Field>
            </Form> 
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
