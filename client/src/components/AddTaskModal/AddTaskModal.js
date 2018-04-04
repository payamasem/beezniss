import React, { Component } from "react";
import "../ProjectModal/ProjectModal.css";
import _ from 'lodash';
import { Image, Button, Item, Form, List, Header, Icon, Modal, Input, Checkbox } from 'semantic-ui-react';
import API from "../../utils/API";

class AddTaskModal extends Component {

  state = {
    modalOpen: false,
    heading: "",
    description: "",
    due_date: "",
    project_id: null,
    users: []
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  saveNewTask = () => {
    let list_item = {
      due_date: this.state.due_date,
      heading: this.state.heading,
      description: this.state.description,
      users: this.state.users,
      project_id: this.props.project_id
    }
    API.createTask(list_item)
      .then(res => {
        console.log('res from creating task = ', res.data)

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
                  onChange={event => this.setState({heading: event.target.value})} />
              <Form.Field required control={Input} 
                  placeholder='task description'
                  name="description"
                  type="text"
                  value={this.state.description}
                  onChange={event => this.setState({description: event.target.value})} />              
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
            <Button color='black' onClick={this.close}>Discard</Button>
            <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={this.saveNewTask} />
          </Modal.Actions>
        </Modal> 
      </div>
    );
  }
}


export default AddTaskModal;
