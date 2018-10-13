import React, { Component } from "react";
import "./EditProjectModal.css";
import _ from 'lodash';
import { Form, Image, Button, Dropdown, Header, Modal, Input, Checkbox } from 'semantic-ui-react';
import API from "../../utils/API";
import Edit from '../../images/edit.png';
import { dateData } from "../../data/dateData.js";

class EditProjectModal extends Component {

  state = {
    modalOpen: false,
    name: "",
    due_date: "",
    slim_due_date: "",
    possible_users: [],  // [1, 2, 3, 4, 5]
    project_users: [],   // [1, 3, ...]
    openOptions: [],    //  [2, 4, 5, ...]
    userMap: {},
      // {
      //   1: "Payam",
      //   2: "Tong Tong",
      //   3: "Nydia",
      //   4: "Bill",
      //   5: "Ehler",
      // }
  };

  componentWillMount() {
    this.loadUsers();
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  loadUsers = () => {
    console.log('££££££££££££££ \n this.props.users : \n', this.props.users);
    this.setState({
      name: this.props.project.name,
      due_date: this.props.project.due_date,
      slim_due_date: this.props.project.due_date.slice(0, 10),
    });
    let userray = [];
    let usermap = {};
    let prjusers = [];
    this.props.users.map(user => {
      userray.push(user.id);
      usermap[user.id] = user.first_name;
    });
    this.props.project.Users.map(uzer => {
      prjusers.push(uzer.id);
    });
    this.setState({ 
      possible_users: userray,
      project_users: prjusers,
      userMap: usermap, 
    });
    this.updateOpenOptions();

    console.log('possible_users: ', this.state.possible_users);
    console.log('project_users: ', this.state.project_users);
    console.log('userMap: ', this.state.userMap);
  }

  addCollaborator = id => {
    this.setState({ project_users: [...this.state.project_users, id] });

    let unselected = [...this.state.openOptions];
    unselected.splice(unselected.indexOf(id), 1);
    this.setState({ openOptions: unselected });

    console.log('state.project_users: \n', this.state.project_users);
    console.log('state.openOptions: \n', this.state.openOptions);
  }

  removeCollaborator = id => {
    let stillAssigenedToProject = [...this.state.project_users];
    stillAssigenedToProject.splice(stillAssigenedToProject.indexOf(id), 1);
    this.setState({
      project_users: stillAssigenedToProject,
      openOptions: [...this.state.openOptions, id],
    });
  }

  updateOpenOptions = () => {
    let opens = [];
    this.state.possible_users.map(possuser => {
      if (this.state.project_users.indexOf(possuser) === -1) opens.push(possuser);
    });
    this.setState({openOptions: opens});
  }

  saveProjectEdits = () => {
    let list_item = {
      due_date: this.state.slim_due_date,
      name: this.state.name,
      users: this.state.project_users  // <–––– [5, 3, 4, ...]
    }
    console.log('||^||___ project obj to be sent to database: ', list_item);
    console.log(`typeof obj.users : ${typeof list_item.users}`);
    for (let each in list_item.users) {
      console.log(`each user : ${each}, typeof ${typeof each}`);
    }
    const { project_users } = this.state;
    for (let i = 0; i < project_users.length; i++ ) {
      console.log('user ' + i + ': \n', project_users[i]);
      console.log('typeof ' + i + ': \n', typeof project_users[i]);
    }
    API.editProject(this.props.project.id, list_item)
      .then(res => {
        console.log('res from editing project = ', res.data)
        this.props.onClose();
        // this.setState({
        //   name: "",
        //   slim_due_date: "",
        //   project_users: []
        // });
      })
      .catch(err => console.log(err));
    this.handleEditProjectModalClose();
    console.log('this.props = ', this.props);
  }

  handleEditProjectModalClose = () => {
    this.props.onClose();
    this.setState({ modalOpen: false });
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
          trigger={<Button onClick={this.handleOpen} className='editButton'><Image src={Edit} width='24' /></Button>}
          open={this.state.modalOpen}
          onOpen={this.loadUsers}
          onClose={this.handleClose} 
          closeIcon
          >

          <Modal.Header icon='archive' as='h1'>Edit Project</Modal.Header>

          <Modal.Content>          
            <Form>
              <Form.Field 
                  required 
                  control={Input} 
                  label='Name of the project'
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({name: event.target.value})} 
              />

              <div className='usersBox'>
                <div className="collaborators">current project collaborators: </div>
                <div className='userChipsBox'>
                {this.state.project_users.map(userid => (
                  <div 
                    key={userid}
                    value={userid}
                    className='modal_users inline'>
                      <div className='userChipText'>{this.state.userMap[userid]}</div>
                      <div 
                        className='x-box'
                        onClick={() => this.removeCollaborator(userid)}
                        >x</div>
                  </div>
                  ))}
                </div>
                <div className='selectionsBox'>
                  <div className="collaborators">add collaborators to project: </div>
                  {this.state.openOptions.map(userid => (
                    <div
                      key={`${userid}two`}
                      value={userid}
                      className="inline openOptionUsers"
                      onClick={(event) => this.addCollaborator(userid)}
                      ><div className="optionChipText">{this.state.userMap[userid]}</div>
                    </div>
                    ))}
                </div>
              </div>

              <Form.Field>
                <Form.Input 
                  required
                  label='Due date for this project' 
                  type='date'
                  value={this.state.slim_due_date}
                  onChange={event => this.setState({slim_due_date: event.target.value})}
                />
              </Form.Field>
            </Form> 
          </Modal.Content>

          <Modal.Actions>
            <Button color='black' onClick={this.handleClose}>Go Back</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={this.saveProjectEdits} />
          </Modal.Actions>
        </Modal> 
      </div>
    );
  }
}


export default EditProjectModal;
