import React, { Component } from "react";
import "./ProjectModal.css";
import _ from 'lodash';
import { Image, Button, Item, Form, List, Header, Icon, Modal, Input, Checkbox } from 'semantic-ui-react';
import API from "../../utils/API";
import TaskManager from "../../panels/TaskManager/TaskManager.js";

class ProjectModal extends Component {

  state = {
    modalOpen: false,
    name: "",
    due_date: ""
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  saveNewProject = () => {
    let list_item = {
      due_date: this.state.due_date,
      name: this.state.name
    }
    API.createProject(list_item)
      .then(res => {
        console.log('res from creating project = ', res.data)

      })
      .catch(err => console.log(err));
    this.setState({
      name: "",
      due_date: ""
    });
    this.handleClose();
    console.log('this.props = ', this.props);
    this.props.onClose();
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
          trigger={
            <Button onClick={this.handleOpen} color='yellow'>Add Project</Button>
          }
          open={this.state.modalOpen}
          onClose={this.handleClose} 
          closeIcon
          >

          <Modal.Header icon='archive' as='h1'>Create a New Project</Modal.Header>

          <Modal.Content>          
            <Form>
              <Form.Field required control={Input} 
                  label='What name is the Project?'
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={event => this.setState({name: event.target.value})} />
              <Form.Field>
                <Form.Input 
                  required
                  label='Due Date for this Project' 
                  type='date' 
                  value={this.state.due_date} 
                  onChange={event => this.setState({due_date: event.target.value})}
                />
              </Form.Field>
            </Form> 
          </Modal.Content>

          <Modal.Actions>
            <Button color='black' onClick={this.close}>Discard</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={this.saveNewProject} />
          </Modal.Actions>
        </Modal> 
      </div>
    );
  }
}


export default ProjectModal;
