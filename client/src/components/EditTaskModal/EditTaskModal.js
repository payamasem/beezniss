import React, { Component } from "react";
import "./EditTaskModal.css";
import _ from 'lodash';
import Hammer from '../../images/hammer.png';
import { Segment, Image, Button, Form, Label, Item, List, Header, Icon, Modal, Input, Checkbox } from 'semantic-ui-react';
import API from "../../utils/API";

class EditTaskModal extends Component {

  state = {
    modalOpen: false,
    heading: this.props.heading,
    description: this.props.description,
    due_date: this.props.task.due_date.slice(0, 10),
    changesMade: false,
    possible_users: [],
    task_users: [],
    openOptions: [],
    userMap: {},
    invalidHeading: -3,
    headingAsInput: false,
    descriptionAsInput: false,
    dateAsInput: false,
    item1AsInput: false,
    item2AsInput: false,
    checklist_items: [],
    confirmOpen: false,
    checklist_item_text: "",
  }

  componentDidMount() {
    this.loadUsers();
  }

  handleEditTaskModalOpen = () => {
    this.loadUsers();
    this.setState({ modalOpen: true });
    document.addEventListener('mousedown', this.handleClick, false);
  }
  handleEditTaskModalClose = () => {
    this.props.onClose();
    this.setState({ 
      modalOpen: false,
      changesMade: false,
      confirmOpen: false,
      headingAsInput: false,
      descriptionAsInput: false,
      invalidHeading: -3,
    });
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  openConfirm = () => this.setState({ confirmOpen: true })
  closeConfirm = () => this.setState({ confirmOpen: false })

  checkForChanges = () => {
    if (this.state.changesMade) this.openConfirm();
    else this.handleEditTaskModalClose();
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
    this.loadChecklistItems();
  }

  updateOpenOptions = () => {
    let opens = [];
    this.state.possible_users.map(possuser => {
      if (this.state.task_users.indexOf(possuser) === -1) opens.push(possuser);
    });
    this.setState({openOptions: opens});
  }

  loadChecklistItems = () => {
    this.setState({ checklist_items: [...this.props.task.Checklist_Items] });

    this.props.task.Checklist_Items.map(item => {
      let key = item.id + "AsInput";
      this.setState({ [item.id]: item, [key]: false });
    });
  }

  addCollaborator = id => {
    this.setState({ task_users: [...this.state.task_users, id] });

    let unselected = [...this.state.openOptions];
    unselected.splice(unselected.indexOf(id), 1);
    this.setState({ openOptions: unselected, changesMade: true });
  }

  removeCollaborator = id => {
    let stillAssigenedToTask = [...this.state.task_users];
    stillAssigenedToTask.splice(stillAssigenedToTask.indexOf(id), 1);
    this.setState({
      task_users: stillAssigenedToTask,
      openOptions: [...this.state.openOptions, id],
      changesMade: true,
    });
  }

  toggleHeading = () => {
    this.setState({ headingAsInput: !this.state.headingAsInput });
  }
  toggleDescription = () => {
    this.setState({ descriptionAsInput: !this.state.descriptionAsInput });
  }
  toggleInput = field => {
    const key = field + "AsInput";
    this.setState({ [key]: !this.state[key] });
  }

  renderHeading = () => {
    if (this.state.headingAsInput === true) {
      return (
        <Form.Field 
            required 
            control={Input}
            label='Task heading'
            name="heading"
            type="text"
            value={this.state.heading}
            onChange={event => this.setState({ heading: event.target.value, changesMade: true })} 
        />
      )
    }
    else {
      // console.log('should be returning the heading text div... ');
      return (
        <Form.Field 
          label="Task heading"
          control={Form.Field}
          className="headingAsText"
          name="heading"
          size="big"
          // onClick={this.toggleHeading}
        >{this.state.heading}
        </Form.Field>
      )
    }
  }

  renderDate = () => {
    const date = this.state.due_date;
    if (this.state.dateAsInput) {
      return (
        <Form.Input 
          required
          label='Due date for this task'
          name='date' 
          type='date'
          value={this.state.due_date}
          onChange={event => this.setState({ due_date: event.target.value, changesMade: true })}
        /> )
    }
    else {
      return (
        <Form.Field 
          name='date'
          label="Due date for this task"
          control={Form.Field}
          className='dateAsText'
          size="big"
        >{date.slice(5, 7) + "/" + date.slice(8, 10) + "/" + date.slice(0, 4)}
        </Form.Field> )
    }
  }

  // renderDescription = () => {
  //   if (this.state.descriptionAsInput === true) {
  //     return (
  //       <Input 
  //         fluid
  //         className="descriptionAsInput"
  //         ref={nodedescription => this.nodedescription = nodedescription}
  //         name="description"
  //         value={this.state.description}
  //         onChange={event => this.setState({ description: event.target.value, changesMade: true })}
  //       />
  //     )
  //   }
  //   else {
  //     return (
  //       <div 
  //         className="descriptionAsText"
  //         ref={nodedescription => this.nodedescription = nodedescription}
  //         name="description"
  //         // onClick={this.toggleDescription}
  //       >{this.state.description}
  //       </div>
  //     )
  //   }
  // }

  handleClick = event => {
    console.log('event', event );

    const name = event.target.attributes.name ? event.target.attributes.name.nodeValue : null;

    console.log('event.target.attributes.name.nodeValue = ', name); 
    console.log('this.state ', this.state);

    if (name) {
      this.setState({ [name + "AsInput"]: true });
      this.textify(name);
    }
    else this.textify(null);
  }

  textify = (exception) => {
    if (exception !== "heading") this.setState({ headingAsInput: false });
    if (exception !== "description") this.setState({ descriptionAsInput: false });
    if (exception !== "date") this.setState({ dateAsInput: false });
    this.state.checklist_items.map(item => {
      if (item.id != exception) {
        this.setState({ [item.id + "AsInput"]: false });
      }
    });
  }

  saveTaskEdits = () => {
    console.log('this.state.slim_due_date: ', this.state.slim_due_date);
    this.closeConfirm();
    if (this.state.heading.trim() === "") this.setState({ invalidHeading: 5 });
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
      this.setState({ invalidHeading: -3 });
      console.log('this.props = ', this.props);
    }
  }

  deleteTask = () => {
    this.handleEditTaskModalClose();
    API.deleteTask(this.props.task.id)
      .then(res => {
        console.log('res from deleting the task: ', res);
        this.props.onClose();
      })
      .catch(err => console.log(err));
  }

  saveNewChecklistItem = () => {
    const list_item = {
      task_id: this.props.task.id,
      text: this.state.checklist_item_text
    }
    // console.log('NEW checklist list_item = ', list_item);
    API.createChecklistItem(list_item)
      .then(res => {
        console.log('res from creating checklist item = ', res.data);
        res.data.Checklist_Items.map(item => {
          this.setState({
            [item.id]: item,
            [item.id + "AsInput"]: false
          });
        });
        this.setState({ 
          checklist_items: res.data.Checklist_Items,
          checklist_item_text: "" 
        }, () => this.props.onClose());

        console.log('STATE : ', this.state);
      })
      .catch(err => console.log(err));
  }

  editChecklistItem = (item_id) => {
    API.editChecklistItem(item_id, this.state[item_id])
      .then(res => {
        console.log("checklist update res = ", res);
      })
      .catch(err => console.log('error during attempted item update: ', err));
  }

  deleteChecklistItem = (item_id) => {
    API.deleteChecklistItem(item_id)
      .then(res => {
          console.log('after deletion, updated task: ', res.data);
          this.setState(state => ({ checklist_items: res.data.Checklist_Items }), 
            () => console.log('updated state: ', this.state)
          );
        })
      .catch(err => console.log("error during attempted deletion: ", err));
  }

  toggleCheckbox = (item_id) => {
    console.log('TOGGLE item_id :', item_id);
    console.log('TOGGLE this.state[item_id] : ', this.state[item_id]);
    this.setState(state => ({
      [item_id]: { ...state[item_id], completed: !state[item_id].completed }
    }), 
    () => this.editChecklistItem(item_id));
  }

  // "toggle heading in the render"
  //               { this.state.headingAsInput ?
  //                 <Form.Field 
  //                     required 
  //                     control={Input}
  //                     ref={headingnode => this.headingnode = headingnode}
  //                     label='Task heading'
  //                     name="heading"
  //                     type="text"
  //                     value={this.state.heading}
  //                     onChange={event => this.setState({ heading: event.target.value, changesMade: true })} 
  //                 />
  //                 :
  //                 <div 
  //                   className="headingAsText"
  //                   ref={nodeheading => this.nodeheading = nodeheading}
  //                   name="heading"
  //                 >{this.state.heading}
  //                 </div>
  //               }



  render() {

    const wellStyles = { maxWidth: 400, margin: '0 auto 10px'};
    const headingValidation = { zIndex: this.state.invalidHeading };

    return (

      <div className="well" style={wellStyles}>

      <Modal 
        trigger={
          <List animated verticalAlign='middle'
            onClick={this.handleEditTaskModalOpen}>
            <List.Item>
              <Image src={Hammer} className='sideMargin displayInline' />
              <List.Header content={this.props.task.heading} className='sideMargin displayInline taskHeading' />
              <List.Content className='sideMargin displayInline taskDescription' >{this.props.task.description}</List.Content>
            </List.Item>
          </List>}
        open={this.state.modalOpen}
        onClose={this.handleEditTaskModalClose}
        basic
        size='small'
        key={this.props.task.id}
      >
        <Modal.Content >
          <Header inverted className="projectHeader">{this.props.project.name}</Header>
          <Form>
            <Form.Group>
              <div >
                {this.renderHeading()}
                <Label pointing color='orange' style={headingValidation}>Task must have a heading</Label>
              </div>
              <div>
                {this.renderDate()}
              </div>
            </Form.Group>

            <div 
            >{ (this.state.descriptionAsInput === true) ?
                  <Input 
                    fluid
                    className="descriptionAsInput"
                    ref={reference => this.reference = reference}
                    name="description"
                    value={this.state.description}
                    onChange={event => this.setState({ description: event.target.value, changesMade: true })}
                  />
                  :
                  <div 
                    className="descriptionAsText"
                    ref={reference => this.reference = reference}
                    name="description"
                    // onClick={this.toggleDescription}
                  >{this.state.description}
                  </div>
            }</div>

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
          <div key={item.id} ref={node => {
                this["node" + item.id] = node 
              }}>
            <Checkbox 
              label={null}
              className="ChecklistItemInline"
              checked={this.state[item.id].completed}
              name={item.id}
              onChange={() => this.toggleCheckbox(item.id)}
              // onClick={() => this.toggleCheckbox(item.id)} }
            />
            <div className="ChecklistItemInline">
              { this.state[item.id + "AsInput"] === false ?
                <label 
                  color='black' 
                  className='checklistItemText'
                  name={item.id}>{this.state[item.id].text}
                </label>
                :
                <Input 
                  className="checklistItemText" 
                  name={item.id} 
                  value={this.state[item.id].text} 
                  onChange={event => this.setState({ [item.id]: {
                      text: event.target.value,
                      completed: this.state[item.id].completed,
                    }
                  })}
                />
              } 
              </div>
              <div 
                className="ChecklistItemInline checklistItemDelete"
                onClick={() => this.deleteChecklistItem(item.id)}
              >x</div>
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
                <div className="taskHeadingBar">{this.state.heading}</div>
                <div className="confirmText">Looks like you've made changes... would you like to save them?</div> 
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
