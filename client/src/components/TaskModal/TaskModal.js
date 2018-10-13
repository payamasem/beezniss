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
    taskIdOfChecklistItemToBeSaved: "",
    formattedDate: ""
  }

  componentDidMount() {
    let due = new Date(this.props.task.due_date);
    let dueDate = due.toDateString();
    this.setState({
      formattedDate: dueDate
    });
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

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
    API.createChecklistItem(list_item)
      .then(res => {
        console.log('res from creating checklist item = ', res.data);
      })
      .catch(err => console.log(err));
    this.setState({
      checklist_item_text: ""
    });
    this.props.onClose();
  }

  deleteTask = () => {
    this.handleClose();
    API.deleteTask(this.props.task.id)
      .then(res => {
        console.log('res from deleting the task: ', res);
        this.props.onClose();
      })
      .catch(err => console.log(err));
  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
  };

  formatDate = () => {
    let due = new Date(this.props.task.due_date);
    let dueDate = due.toDateString();
    console.log('the FORMATTED due date is ', dueDate);
    return dueDate;
  }
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

      <Modal 
        trigger={
          <List animated verticalAlign='middle'
            onClick={this.handleOpen}>
            <List.Item>
              <Image src={Hammer} className='sideMargin displayInline' />
              <List.Header content={this.props.task.heading} className='sideMargin displayInline taskHeading' />
              <List.Content className='sideMargin displayInline taskDescription' >{this.props.task.description}</List.Content>
            </List.Item>
          </List>}

        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        key={this.props.task.id}>
               

        <Header icon='browser' as='h2' content={this.props.task.heading} className='taskModalTitle sideMargin displayInline' />
        <div className='due_date2'> | <span className='due2'>due: </span>{this.state.formattedDate}</div><br/>
        <Header as='h2' className='displayInline descriptor'>task description: </Header>
        <Header as='h2' className='displayInline taskModalDescription'>{this.props.task.description}</Header>
        
        <div className='usersBox'>
          <div className="collaborators">task collaborators: </div>
        {this.props.task.Users.map(user => (
          <div className='modal_users inline' key={user.id} >{user.first_name}</div>
          ))}
        </div>
         {/* map out the checklist text */}
        {this.props.task.Checklist_Items.map(item => (
          // <CheckList lists={items} /> 
          <Modal.Content key={item.id}>

            <Checkbox 
              label={<label color='black' className='checklistItemText'>{item.text}</label>} 
              // {checked={item.completed}
              // onClick={() => this.toggleCheckbox(item.id)} }
            />
          </Modal.Content>

        ))}
          <div className="ui fluid action input addChecklistItemBar">
            <input type="text" 
                placeholder="get something done..."
                value={this.state.checklist_item_text}
                onChange={this.handleInputChange}
                name='checklist_item_text' />
            <div className="ui button" color='olive' onClick={() => this.saveNewChecklistItem()}>add checklist item</div>
          </div>
          <Modal.Actions>
              <Button color='grey' icon='undo' content='Go Back' onClick={() => this.handleClose()} inverted />
              <Button color='red' icon='window close' content='Delete Task' onClick={() => this.deleteTask()} inverted />
              <Button color='olive' icon='checkmark' content='Save Task' onClick={() => this.handleClose()} inverted />
          </Modal.Actions>

        </Modal> 

    </div>
       
    );
  }
}


export default TaskModal;
