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
    possible_users: [],
    project_users: [],
    openOptions: [],
    project_user_ids: [],
    userMap: {},
  };

  componentWillMount() {
    this.loadUsers();
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  loadUsers = () => {
    this.setState({
      name: this.props.project.name,
      due_date: this.props.project.due_date,
    });
    let userray = [];
    let usermap = {};
    let prjusers = [];
    this.props.users.map(user => {
      let newUser = {
        key: user.id,
        value: user.id,
        text: user.first_name
      }
      userray.push(newUser);
      usermap[user.id] = user.first_name;
    });
    this.props.project.Users.map(uzer => {
      let newzer = {
        key: uzer.id,
        value: uzer.id,
        text: uzer.first_name
      }
      prjusers.push(newzer);
    });
    this.setState({ 
      possible_users: userray,
      project_users: prjusers,
      userMap: usermap, 
    });
    console.log('possible_users: ', this.state.possible_users);
    console.log('project_users: ', this.state.project_users);
    console.log('userMap: ', this.state.userMap);
  }

  updateUsers = (value, key) => {
    // value = {
    //   0: 2,  <––– typeof number: number
    //   1: 5,
    //   ...
    // }
    let userobjs = [];
    let userids = [];
    console.log('____________________');
    console.log(`updatingUsers . . . key ${key}, value ${value}, typeof ${typeof value}, value.keys ${value.keys()}, typeof(value.keys) ${typeof value.keys()}`);
    for (let each of value.keys()) {
      userids.push(value[each]);
      let uzr = {
        key: value[each].key,
        value: value[each].value,
        text: value[each].text,
      }
      userobjs.push(uzr);
      console.log(`each : ${each}, typeof ${typeof each}`);
      console.log('value[each]', value[each]);
      console.log('typeof value[each]', typeof value[each]);
    }

    this.setState({
      project_users: userobjs,
      project_user_ids: userids,
    });

    console.log('after setState: \n', this.state.project_users);

    // this.setState({ [key]: value });

  }

  saveProjectEdits = () => {
    let list_item = {
      due_date: this.state.due_date,
      name: this.state.name,
      users: this.state.project_user_ids  // <–––– [0, 3, 4, ...]
    }
    console.log('project obj to be sent: ', list_item);
    console.log('USERS in project obj to be sent: ', list_item.users);
    console.log(`typeof obj.users : ${typeof list_item.users}`);
    for (let each in list_item.users) {
      console.log(`each user : ${each}, typeof ${typeof each}`);
    }
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
                  onChange={event => this.setState({name: event.target.value})} />
              <Dropdown 
                className='userDropdown'
                placeholder='Select...' 
                selection
                search
                multiple
                value={this.state.project_users}
                options={this.state.possible_users}
                onChange={(event,{value}) => this.updateUsers(value, 'project_users')}
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
            <Button color='black' onClick={this.handleClose}>Go Back</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={this.saveProjectEdits} />
          </Modal.Actions>
        </Modal> 
      </div>
    );
  }
}


export default EditProjectModal;
