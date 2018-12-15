import React, { Component } from "react";
import "../CSS/Modal.css";
import _ from 'lodash';
import { Form, Label, Image, Button, Dropdown, Header, Modal, Input, Checkbox } from 'semantic-ui-react';
import API from "../../utils/API";
import Edit from '../../images/edit.png';
import { dateData } from "../../data/dateData.js";

class EditProjectModal extends Component {

  state = {
    modalOpen: false,
    invalidName: -1,
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
    userRemoved: false,
  };

  componentDidMount() {
    this.loadUsers();
  }

  handleEditProjectModalOpen = () => {
    this.loadUsers();
    this.setState({ modalOpen: true });
  }
  handleEditProjectModalClose = () => {
    this.props.onClose();
    this.setState({ modalOpen: false, invalidName: -1 });
    this.loadUsers();
  }
  openConfirm = () => this.setState({ confirmOpen: true })
  closeConfirm = () => this.setState({ confirmOpen: false })

  loadUsers = async () => {
    await this.updateUsers();
    this.updateOpenOptions();
  }

  updateUsers = () => {
    // console.log('££ ££ \n this.PROPS (to be loaded to state): \n', this.props);
    this.setState({
      name: this.props.project.name,
      due_date: this.props.project.due_date,
      slim_due_date: this.props.project.due_date.slice(0, 10),
    });
    let userray = [];  let usermap = {};  let prjusers = [];
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
  }

  updateOpenOptions = () => {
    // console.log('updateOpenOptions function FIRING \n before updating :', this.state);
    let opens = [];
    this.state.possible_users.map(possuser => {
      if (this.state.project_users.indexOf(possuser) === -1) opens.push(possuser);
    });
    this.setState({openOptions: opens});
    // console.log('updateOpenOptions function FIRING \n after updating :', this.state);
  }

  addCollaborator = id => {
    this.setState({ project_users: [...this.state.project_users, id] });

    let unselected = [...this.state.openOptions];
    unselected.splice(unselected.indexOf(id), 1);
    this.setState({ openOptions: unselected });
  }

  printState = () => {
    console.log('–––>> this.state : ', this.state);
    console.log('–––>> this.props : ', this.props);
  }

  removeCollaborator = id => {
    let stillAssigenedToProject = [...this.state.project_users];
    stillAssigenedToProject.splice(stillAssigenedToProject.indexOf(id), 1);
    this.setState({
      project_users: stillAssigenedToProject,
      openOptions: [...this.state.openOptions, id],
      userRemoved: true,
    });
  }

  saveProjectEdits = () => {
    console.log('this.state.slim_due_date: ', this.state.slim_due_date);
    if (this.state.name.trim() === "") this.setState({ invalidName: 5 });
    else {
      let project_object = {
        due_date: this.state.slim_due_date,
        name: this.state.name.trim(),
        users: this.state.project_users  // <–––– [5, 3, 4, ...]
      }
      console.log('||^||___ project obj to be sent to database: ', project_object);
      API.editProject(this.props.project.id, project_object)
        .then(res => {
          console.log('res from editing project = ', res.data);
          this.props.onClose();  // <–– this is critical, as it calls on loadTasks 
                                  // updating all data on the home screen to match what's NEWLY
                                  // in the database;  
        })
        .catch(err => console.log(err));
      this.handleEditProjectModalClose();
      if (this.state.userRemoved === true) this.cascadeUserEdits();
    }
  }

  cascadeUserEdits = () => {
    this.props.project.Tasks.forEach(tasc => {
      let tasqueNouveau = {
        heading: tasc.heading,
        description: tasc.description,
        due_date: tasc.due_date,
        users: [],
      };
      tasc.Users.forEach(tu => {
        // if each user assigned to the task is still assigned to the task's project, push
        if (this.state.project_users.indexOf(tu.id) !== -1) {
          tasqueNouveau.users.push(tu.id);
        }
      });
      API.editTask(tasc.id, tasqueNouveau)
        .then(res => console.log('updated task ', res.data))
        .catch(err => console.log(err));  
    });
    this.setState({ userRemoved: false });
  }

  deleteProject = () => {
    API.deleteProject(this.props.project.id)
      .then(res => {
        console.log('res from deleting the project: ', res);
        this.props.onClose();
      })
      .catch(err => console.log(err));
    this.closeConfirm();
    this.handleEditProjectModalClose();
  }

  render() {
    const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};
    const nameValidation = { zIndex: this.state.invalidName };

    return (

      <div className="well" style={wellStyles}>
        <Modal 
          trigger={<Button onClick={this.handleEditProjectModalOpen} className='editButton'><Image src={Edit} width='24' /></Button>}
          open={this.state.modalOpen}
          onOpen={this.loadUsers}
          onClose={this.handleEditProjectModalClose} 
          closeIcon
          >

          <Modal.Header icon='archive' as='h1'>Edit Project</Modal.Header>

          <Modal.Content>          
            <Form>
              <Form.Group>
                <div >
                  <Form.Field 
                      required 
                      control={Input}
                      label='Name of the project'
                      name="name"
                      type="text"
                      value={this.state.name}
                      onChange={event => this.setState({name: event.target.value})} 
                  />
                  <Label pointing color='orange' style={nameValidation}>Project must have a name</Label>
                </div>
                <div>
                  <Form.Field>
                    <Form.Input 
                      required
                      label='Due date for this project' 
                      type='date'
                      value={this.state.slim_due_date}
                      onChange={event => this.setState({slim_due_date: event.target.value})}
                    />
                  </Form.Field>
                </div>
              </Form.Group>
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
            </Form> 
          </Modal.Content>

          <Modal.Actions>
            <Button color='black' onClick={this.handleEditProjectModalClose}>Go Back</Button>
            <Modal 
              trigger={<Button color='red' icon='window close' content='Delete Project' onClick={() => this.openConfirm()} inverted />}
              open={this.state.confirmOpen}
            >
              <Modal.Content >
                <div className="projectNameBar">{this.props.project.name}</div>
                <div className="confirmText">Are you sure you want to delete this project?</div> 
              </Modal.Content>
              <Modal.Actions>
                <Button 
                  color="red"
                  onClick={() => this.deleteProject()}
                >Yes, delete the project
                </Button>
                <Button 
                  color="black"
                  onClick={() => this.closeConfirm()}
                >Nevermind, keep the project
                </Button>
              </Modal.Actions>
            </Modal>
            <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={this.saveProjectEdits} />
          </Modal.Actions>
        </Modal> 
      </div>
    );
  }
}


export default EditProjectModal;
