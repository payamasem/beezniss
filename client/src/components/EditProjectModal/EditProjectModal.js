import React, { Component } from "react";
import "./EditProjectModal.css";
import _ from 'lodash';
import { Form, Image, Button, Dropdown, Item, List, Header, Icon, Modal, Input, Checkbox } from 'semantic-ui-react';
import API from "../../utils/API";
import Edit from '../../images/edit.png';

class EditProjectModal extends Component {

  state = {
    modalOpen: false,
    checked: false,
    checklist_item_text: "",
    taskIdOfChecklistItemToBeSaved: "",
    formattedDate: "",
    name: "",
    due_date: "",
    possible_users: [],
    project_users: [],
    openOptions: []
  }
  
  componentWillMount() {
    this.loadUsers();
    this.loadOptions();
  }

  componentDidMount() {
    this.loadUsers();
    this.loadOptions();

    let due = new Date(this.props.project.due_date);
    let dueDate = due.toDateString();
    console.log('the FORMATTED due date is ', dueDate);
    this.setState({
      formattedDate: dueDate
    });
  }

  loadUsers = () => {
    let project_users = [];
    let possible_users = [];
    this.setState({
      name: this.props.project.name,
      due_date: this.props.project.due_date,
    });
    this.props.users.map(user => {
      let newUser = {
        key: user.id,
        value: user.id,
        text: user.first_name
      }
      possible_users.push(newUser);
      this.setState({ possible_users: possible_users });
    });
    this.props.project.Users.map(uzer => {
      let newzer = {
        key: uzer.id,
        value: uzer.id,
        text: uzer.first_name
      }
      project_users.push(newzer);
      this.setState({ project_users: project_users });
      console.log('project_users: ', this.state.project_users);
    });
  };
  updateUsers = (value, key) => {
    this.setState({ [key]: value });
    console.log(`NOW project_users in state are this: ${ [key], value }`)
  };

  loadOptions = () => {
    this.setState({ openOptions: this.state.possible_users });
  }

  updateOptions = id => {
    const noo = [];
    this.state.openOptions.map((op, i) => {
      if (op !== id) {
        noo.push(op);
      }
    });
    this.updateUsers(noo, "openOptions");
    const nuu = _.clone(this.state.project_users);
    nuu.push(id);
    this.updateUsers(nuu, "project_users");
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => {
    this.props.onClose();
    this.setState({ modalOpen: false });
  };

  saveProjectEdits = () => {
    // const selectedUsers = [];
    // this.state.project_users.forEach(user => {
    //   console.log(`user of the forEach is ${user}`);
    //   selectedUsers.push(user);
    // });
    // console.log(`selectedUsers: ${selectedUsers}`);
    let list_item = {
      due_date: this.state.due_date,
      name: this.state.name,
      users: this.state.project_users
    }
    console.log('project obj to be sent: ', list_item);
    API.editProject(this.props.project.id, list_item)
      .then(res => {
        console.log('res from editing project = ', res.data)
        this.props.onClose();
        this.setState({
          name: "",
          due_date: "",
          project_users: []
        });
      })
      .catch(err => console.log(err));
    this.handleClose();
    console.log('this.props = ', this.props);
  };
  deleteProject = () => {
    this.handleClose();
    API.deleteProject(this.props.project.id)
      .then(res => {
        console.log('res from deleting the project: ', res);
        this.props.onClose();
      })
      .catch(err => console.log(err));
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
  };

  formatDate = () => {
    let due = new Date(this.props.project.due_date);
    let dueDate = due.toDateString();
    console.log(`this.props.project.due_date ${this.props.project.due_date}`);
    console.log(`dueDate (formatted) ${dueDate}`);    
    return dueDate;
  };

  render() {
    return (
      <div className="well buttonWell">
        <Modal 
          trigger={<Button onClick={this.handleOpen} className='editButton'><Image src={Edit} width='24' /></Button>}
          open={this.state.modalOpen}
          onOpen={this.loadUsers}
          onClose={this.handleClose}
          basic
          size='small'
          key={this.props.project.id}>     

          <Modal.Header className='editProjectHeader'>EDIT project</Modal.Header>
          <Modal.Content>
            <Form>
              <Input
                className='projectNameBar inputBar'
                label='project name'
                name="name"
                type="text"
                value={this.state.name}
                onChange={event => this.setState({name: event.target.value})} />
              <div className='due_date2'> | <span className='due2'>currently due: </span>{this.state.formattedDate}</div><br/>
              <Input 
                label='modified project due date'
                className='inputBar' 
                type='date' 
                value={this.state.due_date} 
                onChange={event => this.setState({due_date: event.target.value})}
              />    
              <div className='usersBox'>
                <div className="collaborators">current project collaborators: </div>
                <div className='usersBox'>
                {this.state.project_users.map(user => (
                  <div 
                    key={user.id}
                    className='modal_users inline'>
                      {user.first_name}
                  </div>
                  ))}
                </div>
                <div className='selectionsBox'>
                  {this.state.possible_users.map(user => (
                    <div
                      key={`${user.id}two`}
                      value={user.first_name}
                      content={user.first_name}
                      className="modal_users inline"
                      onClick={() => this.updateOptions(user.id)}
                      >
                    </div>
                    ))}
                </div>
                <Dropdown 
                  className='userDropdown'
                  placeholder='Modify users...' 
                  selection
                  search
                  multiple
                  fluid
                  options={this.state.possible_users}
                  value={this.state.project_users}
                  onChange={(event,{value}) => this.updateUsers(value, 'project_users')}
                  >
                </Dropdown>
              </div>
            </Form>
          </Modal.Content>
          <Modal.Content>
            <div className='taskListHeader'>Tasks within this project:
            </div>
            <div className='taskListBox'>
            {this.props.project.Tasks.map(task => (
                <div as='h2' key={task.id} className='taskItem'>{task.heading}</div>
            ))}
            </div>
          </Modal.Content>
          <Modal.Actions>
              <Button color='instagram' icon='undo' content='Go Back' onClick={() => this.handleClose()} inverted />
              <Button color='red' icon='window close' content='Delete Project' onClick={() => this.deleteProject()} inverted />
              <Button color='olive' icon='checkmark' content='Save Project' onClick={() => this.saveProjectEdits()} inverted />
          </Modal.Actions>
        </Modal> 
      </div>
       
    );
  }
}


export default EditProjectModal;
