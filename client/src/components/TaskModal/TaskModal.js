import React, { Component } from "react";
import "./TaskModal.css";
import _ from 'lodash';
import Hammer from '../../images/hammer.png';
import { Image, Button, Item, List, Header, Icon, Modal, Input, Checkbox } from 'semantic-ui-react';

class TaskModal extends Component {

  state = {
    modalOpen: false
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  render() {
    console.log("this is modal props:", this.props.tasks.project)
    const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};

    return (

      <div className="well" style={wellStyles}>
        {this.props.tasks.map(task => (
      <Modal 
        trigger={
          <List animated verticalAlign='middle'
            onClick={this.handleOpen}>
            <List.Item>
              <Image src={Hammer} />
              <List.Header content={task.heading} />
              <List.Content>{task.description}</List.Content>
            </List.Item>
          </List>}

        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        key={task.id}>
               

        <Header icon='browser' as='h2' content={task.heading} />
        <Header as='h2' content="Description:" />
        <Header as='h2' content={task.description} />
        
        {console.log("checklist items:", task.checklist_items)}

         {/* map out the checklist text */}
        {task.Checklist_Items.map(item => (
          // <CheckList lists={items} /> 
          <Modal.Content key={item.id}>
            {console.log("Item: ", item)}
            <Checkbox checked={item.completed} /><h3>{item.text}</h3>
          </Modal.Content>

        ))}
          <Input fluid action='Add Checklist Item' placeholder='Meeting at 8AM...' />
          <Modal.Actions>
              <Button color='red' icon='undo' content='Go Back' onClick={this.handleClose} inverted />
              <Button color='green' icon='checkmark' content='Save Task' onClick={this.handleClose} inverted />
          </Modal.Actions>

        </Modal> 
      ))}
    </div>
       
    );
  }
}


export default TaskModal;
