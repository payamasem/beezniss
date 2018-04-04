import React, { Component } from "react";
import "./TaskModal.css";
import _ from 'lodash';
import Hammer from '../../images/hammer.png';
import { Image, Button, Item, List, Header, Icon, Modal, Input, Checkbox } from 'semantic-ui-react';
import API from "../../utils/API";

class TaskModal extends Component {

  state = {
    modalOpen: false,
    checked: false,
    checklist_item_text: "",
    taskIdOfChecklistItemToBeSaved: ""
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  preSave = task_id => {
    this.setState({
      taskIdOfChecklistItemToBeSaved: task_id
    });
    this.saveNewChecklistItem();
  }

  saveNewChecklistItem = () => {
    console.log('we are in the saveNewChecklistItem function!');

    let list_item = {
      task_id: this.state.taskIdOfChecklistItemToBeSaved,
      text: this.state.checklist_item_text
    }
    console.log('NEW checklist list_item = ', list_item);
    // API.createChecklistItem(list_item)
    //   .then(res => {
    //     console.log('res from creating checklist item = ', res.data)

    //   })
    //   .catch(err => console.log(err));
    this.setState({
      checklist_item_text: ""
    });
  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
  };
  toggleCheckbox = (item_id) => {
    this.setState({
      checked: !this.state.checked
    });
    let obj = {
      completed: this.state.checked
    }
    API.editChecklistItem(item_id, obj)
      .then(res => {
        console.log("checklist update res = ", res);
      });
  }

  render() {

    const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};

    return (

      <div className="well" style={wellStyles}>
        {this.props.tasks.map(task => (
      <Modal 
        trigger={
          <List animated verticalAlign='middle'
            onClick={this.handleOpen}>
            <List.Item>
              <Image src={Hammer} className='taskItemElements' />
              <List.Header content={task.heading} className='taskItemElements taskHeading' />
              <List.Content className='taskItemElements taskDescription' >{task.description}</List.Content>
            </List.Item>
          </List>}

        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        key={task.id}>
               

        <Header icon='browser' as='h2' content={task.heading} className='taskModalTitle' />
        <Header as='h2' className='taskModalElements descriptor'>task description: </Header>
        <Header as='h2' className='taskModalElements taskModalDescription'>{task.description}</Header>
        


         {/* map out the checklist text */}
        {task.Checklist_Items.map(item => (
          // <CheckList lists={items} /> 
          <Modal.Content key={item.id}>

            <Checkbox 
              checked={item.completed}
              label={<label color='black' className='checklistItemText'>{item.text}</label>} 
              onClick={() => this.toggleCheckbox(item.id)} />
          </Modal.Content>

        ))}
          <div className="ui fluid action input">
            <input type="text" 
                placeholder="get something done..."
                value={this.state.checklist_item_text}
                onChange={this.handleInputChange}
                name='checklist_item_text' />
            <div className="ui button" color='olive' onClick={() => this.saveNewChecklistItem}>add checklist item</div>
          </div>
          <Modal.Actions>
              <Button color='red' icon='undo' content='Go Back' onClick={() => this.handleClose} inverted />
              <Button color='olive' icon='checkmark' content='Save Task' onClick={() => this.handleClose} inverted />
          </Modal.Actions>

        </Modal> 
      ))}
    </div>
       
    );
  }
}


export default TaskModal;
