import React, { Component } from "react";
import "../CSS/Modal.css";
import _ from 'lodash';
import { Grid, Form, Label, Image, Button, Dropdown, Header, Modal, Input, Checkbox } from 'semantic-ui-react';
import API from "../../utils/API";
import Edit from '../../images/edit.png';
import DeleteCharcoal from '../../images/deleteCharcoal.png';
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
    dateAsInput: false,
    projectNameAsInput: false,
    confirmOpen: false,
    changesMade: false,
  };

  componentDidMount() {
    this.loadUsers();
  }

  handleEditProjectModalOpen = () => {
    this.loadUsers();
    this.setState({ modalOpen: true });
    document.addEventListener('mousedown', this.handleClick, false);
    document.addEventListener("keyup", this.handleStrike, false);
  }
  handleEditProjectModalClose = () => {
    this.props.onClose();
    this.setState({ 
      modalOpen: false, 
      invalidName: -1,
      changesMade: false,
      confirmOpen: false,
      wannaSaveOpen: false,
    });
    this.textify(null);
    this.loadUsers();
    document.removeEventListener('mousedown', this.handleClick, false);
    document.removeEventListener("keyup", this.handleStrike, false);
  }

  checkForChanges = () => {
    if (this.state.changesMade) this.openWannaSave();
    else this.handleEditProjectModalClose();
  }
  openConfirm = () => this.setState({ confirmOpen: true })
  closeConfirm = () => this.setState({ confirmOpen: false })

  openWannaSave = () => this.setState({ wannaSaveOpen: true })
  closeWannaSave = () => this.setState({ wannaSaveOpen: false })

  loadUsers = async () => {
    await this.updateUsers();
    this.updateOpenOptions();
  }

  updateUsers = () => {
    this.setState({
      projectName: this.props.project.name,
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
    let opens = [];
    this.state.possible_users.map(possuser => {
      if (this.state.project_users.indexOf(possuser) === -1) opens.push(possuser);
    });
    this.setState({openOptions: opens});
  }

  handleClick = event => {
    const name = event.target.attributes.name ? event.target.attributes.name.nodeValue : null;

    if (name) {
      this.setState({ [name + "AsInput"]: true });
      this.textify(name);
    }
    else this.textify(null);
  }

  handleStrike = event => {
    if (event.keyCode === 13) {
      this.textify(null);
      if (this.state.confirmOpen === true) this.deleteProject();
      else if (this.state.wannaSaveOpen === true) this.saveProjectEdits();
    }
  }

  textify = (exception) => {
    if (exception !== "projectName") this.setState({ projectNameAsInput: false });
    if (exception !== "date") this.setState({ dateAsInput: false });
  }

  addCollaborator = id => {
    this.setState({ project_users: [...this.state.project_users, id], changesMade: true });

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
      changesMade: true,
    });
  }

  saveProjectEdits = () => {
    console.log('this.state.slim_due_date: ', this.state.slim_due_date);
    if (this.state.projectName.trim() === "") this.setState({ invalidName: 5 });
    else {
      let project_object = {
        due_date: this.state.slim_due_date,
        name: this.state.projectName.trim(),
        users: this.state.project_users  // <–––– [5, 3, 4, ...]
      }
      console.log('||^||___ project obj to be sent to database: ', project_object);
      API.editProject(this.props.project.id, project_object)
        .then(res => {
          console.log('res from editing project = ', res.data);
          this.props.onClose();  // <–– This is critical, as it calls the loadTasks function in context of 
                                  // the origin of props (TaskManager), updating all data on the home screen
                                  //  to reflect the updated database including the project we just edited.  
        })
        .catch(err => console.log(err));
      this.handleEditProjectModalClose();
      if (this.state.userRemoved === true) this.cascadeUserEdits();
    }
  }

  cascadeUserEdits = () => {
    // If a user is removed from a project, that person is obviously no longer 
    // eligible to work on that project's tasks and must be removed from
    // any assignments to tasks of that project:

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
          trigger={<Button onClick={this.handleEditProjectModalOpen} 
            className='editButton'><Image src={Edit} width='24' /></Button>}
          open={this.state.modalOpen}
          onOpen={this.loadUsers}
          onClose={this.checkForChanges}
          className="theModal"
          >
          <Modal.Content>
            <Grid divided="vertically">
              <Grid.Row className="modalRow">
                <Grid.Column width={3} className="labels">
                  Name of the project:
                </Grid.Column>
                <Grid.Column width={6}>
                  { this.state.projectNameAsInput === true ?
                    <div >
                      <Form.Field 
                          required 
                          control={Input}
                          className="projectNameAsInput"
                          name="projectName"
                          type="text"
                          value={this.state.projectName}
                          onChange={event => this.setState({projectName: event.target.value, changesMade: true })} 
                      />
                      <Label pointing color='orange' style={nameValidation}>Project must have a name</Label>
                    </div>
                    :
                    <Form.Field 
                      control={Form.Field}
                      className="projectNameAsText"
                      name="projectName"
                      size="big"
                    >{this.state.projectName}
                    </Form.Field>
                  }
                </Grid.Column>

                <Grid.Column width={2} className="labels">
                  Due date for this project:
                </Grid.Column>
                <Grid.Column width={5}>
                  { this.state.dateAsInput === true ? 
                      <div>
                        <Form.Field>
                          <Form.Input 
                            required
                            type='date'
                            className="dateAsInput"
                            name="date"
                            value={this.state.slim_due_date}
                            onChange={event => this.setState({slim_due_date: event.target.value, changesMade: true })}
                          />
                        </Form.Field>
                      </div>
                      :
                      <Form.Field 
                        name='date'
                        control={Form.Field}
                        size="big"
                        className='dateAsText'>
                        {this.state.slim_due_date.slice(5, 7) + "/" 
                          + this.state.slim_due_date.slice(8, 10) 
                          + "/" + this.state.slim_due_date.slice(0, 4)}
                      </Form.Field>
                  }    
                </Grid.Column>
              </Grid.Row>

            <Grid.Row className='usersBox modalRow'>
              <Grid.Column 
                width={3}
                className="labels">
                Current project collaborators: 
              </Grid.Column>
              <Grid.Column width={13} className='userChipsBox'>
                {this.state.project_users.map(userid => (
                  <div 
                    key={userid}
                    value={userid}
                    className='modal_users inline'>
                      <div className='userChipText'><div>{this.state.userMap[userid]}</div></div>
                      <div className="xboxMargin">
                        <div 
                          className='x-box'
                          onClick={() => this.removeCollaborator(userid)}
                        ><div><Image src={DeleteCharcoal} className="theX" /></div></div>
                      </div>
                  </div>
                ))}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className='usersBox modalRow'>
              <Grid.Column 
                width={3}
                className="labels">
                Add collaborators: 
              </Grid.Column>
              <Grid.Column width={13} className="userChipsBox">
                {this.state.openOptions.map(userid => (
                  <div
                    key={`${userid}two`}
                    value={userid}
                    className="inline openOptionUsers"
                    onClick={(event) => this.addCollaborator(userid)}
                    ><div className="userChipText optionChipText">{this.state.userMap[userid]}</div>
                  </div>
                  ))}
              </Grid.Column>
            </Grid.Row>


            </Grid>      
          </Modal.Content>

          <Modal.Actions>
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

            <Modal 
              open={this.state.wannaSaveOpen}
            >
              <Modal.Content >
                <div className="projectNameBar">{this.state.projectName}</div>
                <div className="confirmText">Looks like you've made changes... would you like to save them?</div> 
              </Modal.Content>
              <Modal.Actions>
                <Button 
                  color="green"
                  onClick={() => this.saveProjectEdits()}
                >Yes, save the changes
                </Button>
                <Button 
                  color="black"
                  onClick={() => this.handleEditProjectModalClose()}
                >Nah, let 'em go
                </Button>
              </Modal.Actions>
            </Modal>
            <Button 
                color='grey' 
                icon='undo' 
                content='Go Back' 
                onClick={() => this.checkForChanges()} />
            <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={this.saveProjectEdits} />
          </Modal.Actions>
        </Modal> 
      </div>
    );
  }
}


export default EditProjectModal;
