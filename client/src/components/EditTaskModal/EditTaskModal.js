import React, { Component } from "react";
import "./EditTaskModal.css";
import _ from 'lodash';
import Hammer from '../../images/hammer.png';
import { Image, Button, Form, Label, Item, List, Header, Icon, Modal, Input, Checkbox } from 'semantic-ui-react';
import API from "../../utils/API";

class EditTaskModal extends Component {

  state = {
    modalOpen: false,
    heading: this.props.heading,
    description: this.props.description,
    due_date: this.props.task.due_date.slice(0, 10),
    headingMutated: false,
    descriptionMutated: false,
    dueDateMutated: false,
    usersMutated: false,
    possible_users: [],
    task_users: [],
    openOptions: [],
    userMap: {},
    invalidHeading: -1,
    headingAsInput: false,
    descriptionAsInput: false,
    item1AsInput: false,
    item2AsInput: false,
    checklist_items: [],
    confirmOpen: false,
    checklist_item_text: "",
  }

  componentDidMount() {
    this.loadUsers();
  }

  handleOpen = () => {
    this.loadUsers();
    this.setState({ modalOpen: true });
  }
  handleClose = () => this.setState({ modalOpen: false });

//============================= [[[

  handleEditTaskModalOpen = () => this.setState({ modalOpen: true })
  handleEditTaskModalClose = () => {
    this.props.onClose();
    this.setState({ 
      modalOpen: false,
      headingMutated: false,
      descriptionMutated: false,
      usersMutated: false,
      dueDateMutated: false,
      confirmOpen: false,
    });
  }
  openConfirm = () => this.setState({ confirmOpen: true })
  closeConfirm = () => this.setState({ confirmOpen: false })

  checkForChanges = () => {
    const { headingMutated, descriptionMutated, dueDateMutated, usersMutated } = this.state;
    if (headingMutated || descriptionMutated || dueDateMutated || usersMutated) {
      this.openConfirm();
    }
    else {
      this.handleEditTaskModalClose();
    }
  }

  loadUsers = async () => {
    await this.updateUsers();
    this.updateOpenOptions();
  }

  updateUsers = () => {
    this.setState({
      heading: this.props.task.heading,
      description: this.props.task.description,
      due_date: this.props.task.due_date.slice(0, 10),
    });
    let potentialUsers = [];  let usermap = {};  let taskUsers = [];
    this.props.project.Users.map(user => {
      potentialUsers.push(user.id);
      usermap[user.id] = user.first_name;
    });
    this.props.task.Users.map(uzer => {
      taskUsers.push(uzer.id);
    });
    this.setState({ 
      possible_users: potentialUsers,
      task_users: taskUsers,
      userMap: usermap,
    });

    this.setState({ checklist_items: [...this.props.task.Checklist_Items] });

    this.props.task.Checklist_Items.map(item => {
      this.setState({ [item.id]: item });
    });
  }

  loadChecklistItems = () => {

  }

  addCollaborator = id => {
    this.setState({ task_users: [...this.state.task_users, id] });

    let unselected = [...this.state.openOptions];
    unselected.splice(unselected.indexOf(id), 1);
    this.setState({ openOptions: unselected, usersMutated: true });
  }

  removeCollaborator = id => {
    let stillAssigenedToTask = [...this.state.task_users];
    stillAssigenedToTask.splice(stillAssigenedToTask.indexOf(id), 1);
    this.setState({
      task_users: stillAssigenedToTask,
      openOptions: [...this.state.openOptions, id],
      usersMutated: true,
    });
  }

  updateOpenOptions = () => {
    let opens = [];
    this.state.possible_users.map(possuser => {
      if (this.state.task_users.indexOf(possuser) === -1) opens.push(possuser);
    });
    this.setState({openOptions: opens});
  }

  toggleHeading = () => {
    this.setState({ headingAsInput: !this.state.headingAsInput });
  }
  toggleDescription = () => {
    this.setState({ descriptionAsInput: !this.state.descriptionAsInput });
  }

  renderHeading = () => {

  }

  renderDescription = () => {
    if (this.state.descriptionAsInput === true) {
      return (
        <Input 
          value={this.state.description}
          onChange={event => this.setState({ description: event.target.value, descriptionMutated: true })}
        />
      )

    }
    else {
      return (
        <div onClick={this.toggleDescription}>{this.state.description}</div>

      )

    }
  }

  saveTaskEdits = () => {
    console.log('this.state.slim_due_date: ', this.state.slim_due_date);
    this.closeConfirm();
    if (this.state.heading.trim() === "") this.setState({ invalidName: 5 });
    else {
      const task_object = {
        due_date: this.state.due_date,
        heading: this.state.heading,
        description: this.state.description,
        users: this.state.task_users  // <–––– [5, 3, 4, ...]
      };
      console.log('||^||___ task obj to be sent to database: ', task_object);

      API.editTask(this.props.task.id, task_object)
        .then(res => {
          console.log('res from editing task = ', res.data)
          this.props.onClose();
        })
        .catch(err => console.log(err));

      this.handleEditTaskModalClose();
      this.setState({ invalidName: -1 });
      console.log('this.props = ', this.props);
    }
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

  saveNewChecklistItem = () => {
    let list_item = {
      task_id: this.props.task.id,
      text: this.state.checklist_item_text
    }
    // console.log('NEW checklist list_item = ', list_item);
    API.createChecklistItem(list_item)
      .then(res => {
        console.log('res from creating checklist item = ', res.data);
        this.setState({ 
          checklist_items: res.data.Checklist_Items,
          checklist_item_text: "" 
        }, () => this.props.onClose());
        res.data.Checklist_Items.map(item => {
          this.setState({
            [item.id]: item
          });
        });
        console.log('STATE : ', this.state);
      })
      .catch(err => console.log(err));
  }

  editChecklistItem = (item_id) => {
    API.editChecklistItem(item_id, this.state[item_id])
      .then(res => {
        console.log("checklist update res = ", res);
      });
  }

  toggleCheckbox = (item_id) => {
    this.setState(state => ({
      [item_id]: { ...state[item_id], checked: !state[item_id].checked }
    }), 
    () => this.editChecklistItem(item_id));
  }



  render() {

    const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};
    const headingValidation = { zIndex: this.state.invalidHeading };
    const clickBoxStyle = { width: 100, height: 100, border: 'solid white 5px' };

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
        key={this.props.task.id}
      >
        <Modal.Content >
          <Header inverted className="projectHeader">{this.props.project.name}</Header>
          <Form>
            <Form.Group>
              <div >
                <Form.Field 
                    required 
                    control={Input}
                    label='Task heading'
                    name="name"
                    type="text"
                    value={this.state.heading}
                    onChange={event => this.setState({ heading: event.target.value, headingMutated: true })} 
                />
                <Label pointing color='orange' style={headingValidation}>Task must have a heading</Label>
              </div>
              <div>
                <Form.Field>
                  <Form.Input 
                    required
                    label='Due date for this task' 
                    type='date'
                    value={this.state.due_date}
                    onChange={event => this.setState({ due_date: event.target.value, dueDateMutated: true })}
                  />
                </Form.Field>
              </div>
            </Form.Group>
            <Form.Field 
              control={Input}
              label="Task description"
              type="text"
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value, descriptionMutated: true })}  
            />

            <div 
              onClickOut={this.toggleDescription}
            >{this.renderDescription()}</div>

          </Form>

          <div className='usersBox'>
            <div className="collaborators">current task collaborators: </div>
            <div className='userChipsBox'>
            {this.state.task_users.map(userid => (
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
              <div className="collaborators">add collaborators to task: </div>
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


        {this.state.checklist_items.map(item => (
          <div key={item.id} ref={node => this.node = node}>
            <div style={clickBoxStyle}>"click in this box" {item.text}</div>
            <Checkbox 
              label={<label color='black' className='checklistItemText'>{item.text}</label>} 
              checked={this.state[item.id].completed}
              onChange={() => this.toggleCheckbox(item.id)}
              // onClick={() => this.toggleCheckbox(item.id)} }
            />
          </div>

        ))}
          <div className="ui action input addChecklistItemBar">
            <input type="text"
                placeholder="get something done..."
                value={this.state.checklist_item_text}
                onChange={event => this.setState({ checklist_item_text: event.target.value })}
                name='checklist_item_text' 
            />
            <div className="ui button" color='olive' onClick={() => this.saveNewChecklistItem()}>add checklist item</div>
          </div>

        </Modal.Content>

        <Modal.Actions>
            
            <Modal 
              trigger={<Button color='grey' icon='undo' content='Go Back' onClick={() => this.checkForChanges()} inverted />}
              open={this.state.confirmOpen}
            >
              <Modal.Content >
                <div className="projectNameBar">{this.props.project.name}</div>
                <div>Looks like you've made changes... would you like to save them?</div> 
              </Modal.Content>
              <Modal.Actions>
                <Button 
                  color="green"
                  onClick={() => this.saveTaskEdits()}
                >Yes, save the changes
                </Button>
                <Button 
                  color="black"
                  onClick={() => this.handleEditTaskModalClose()}
                >Nah, let 'em go
                </Button>
              </Modal.Actions>
            </Modal>
            <Button color='red' icon='window close' content='Delete Task' onClick={() => this.deleteTask()} inverted />
            <Button color='olive' icon='checkmark' content='Save Task' onClick={() => this.saveTaskEdits()} inverted />
        </Modal.Actions>
      </Modal> 
    </div>
       
    );
  }
}


export default EditTaskModal;
