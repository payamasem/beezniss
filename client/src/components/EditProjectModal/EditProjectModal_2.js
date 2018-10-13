import React, { Component } from "react";
import "./EditProjectModal.css";
import _ from 'lodash';
import { Form, Image, Button, Dropdown, Header, Modal, Input, Checkbox } from 'semantic-ui-react';
import API from "../../utils/API";
import Edit from '../../images/edit.png';
import { dateData } from "../../data/dateData.js";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

class EditProjectModal extends Component {

  state = {
    modalOpen: false,
    // checked: false,
    checklist_item_text: "",
    formattedDate: "",
    name: "",
    due_date: "",
    possible_users: [],
    project_users: [],
    openOptions: [],
    // taskIdOfCheckliToBeSaved: "",
    day: {
      key: 1,
      value: 1,
      text: "1"
    } ,
    month: { 
      key: 1,
      value: 1,
      text: "January",
    },
    year: {
      key: 2018,
      value: 2018,
      text: "2018",
    },
    dateData: {
      days: [],
      months: [],
      monthlist: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      years: [],
      monthMap: { January: 1, February: 2, March: 3, /// etc., populated by the function
      },
    },
    lastChance: "UNCHANGED",
  }

  componentWillMount() {
    this.loadProjectUsers();
  }

  componentDidMount() {
    this.loadProjectUsers();
    this.loadProjectCollaboratorOptions();
    this.createDateData();
    this.getProjectDate();
  }

  loadProjectUsers = () => {
    let project_users = [];
    let possible_users = [];
    this.setState({
      name: this.props.project.name,
      due_date: this.props.project.due_date,
    });

    this.props.users.map(user => {
      let newUser = {
        key: user.id,
        value: user.id,
        text: user.first_name
      }
      possible_users.push(newUser);
    });
    this.setState({ possible_users: possible_users });

    this.props.project.Users.map(uzer => {
      let newzer = {
        key: uzer.id,
        value: uzer.id,
        text: uzer.first_name
      }
      project_users.push(newzer);
    });
    console.log(`about to setState project_users ${project_users}`);
    this.setState({ project_users: project_users });
    console.log('project_users: ', this.state.project_users);
  }

  loadProjectCollaboratorOptions = () => {   /// possible_users - project_users = openOptions
    let availables = [];
    this.state.possible_users.map(possUser => {
      let isAlreadyOnProject = false;
      this.state.project_users.map(projUser => {
        if (possUser.value === projUser.value) isAlreadyOnProject = true;
      });
      if (isAlreadyOnProject === false) availables.push(possUser);
    });

    this.setState({ openOptions: availables });

    console.log(`######### this.state.openOptions ${this.state.openOptions}`);
  }

  updateCollaborators = (value, key) => {
    this.setState({ [key]: value });
    console.log(`uC ^^^^ state.${[key]}: ${ [key], value }`);
    for (let each in this.state.project_users) {
      console.log(`each : ${each} \n typeof each ${typeof each}`);
    }
  }

  updateDropdownCollaborators = (users) => {
    console.log(`the object sent by the Dropdown onChange is ...`);
    console.log(`${users}`);    
    this.setState({ "project_users": users });

    let trimmed = [];
    users.map(uzr => {
      console.log(`typeof uzr ${typeof uzr}`);
      if (typeof uzr == "object") trimmed.push(uzr);
      else if (typeof uzr == "number") {
        this.removeFromOpenOptions(uzr);
        this.state.possible_users.map(yuzer => {
          if (yuzer.value == uzr) trimmed.push(yuzer);
        });
      }
    });
    this.updateCollaborators(trimmed, "project_users");
    console.log(`uDC ^^^^^^^ "project_users": ${ "project_users", trimmed }`);

    // this.loadProjectCollaboratorOptions();
  }

  addCollaborator = user => {   
    // const nuu = _.clone(this.state.project_users);
    // this.state.project_users.map(uzr => {
    //   if (userid === uzr.value) nuu.push(uzr) 
    // });
    // this.updateCollaborators(nuu, "project_users");

    console.log(`*&* the "user" argument passed is ${user.text}`);
    console.log(`*&* the "user" argument passed is ${user.value}`);
    for (let p in user) {
      console.log(`––––>> p in user: ${p}`);
      console.log(`––––>> p in user: ${p.value}`);
    }

    const nuu = [...this.state.project_users, user]
    this.updateCollaborators(nuu, "project_users");

    // const noo = [];
    // this.state.openOptions.map((op, i) => {
    //   if (op.value !== userid) {
    //     noo.push(op);
    //   }
    // });
    // this.updateCollaborators(noo, "openOptions");

    for (let open in this.state.openOptions) {
      console.log(`openOption : ${open}, typeof ${typeof open}`);
    }

    const noo = [];
    this.state.openOptions.map((op, i) => {
      if (op.value !== user.value) {
        noo.push(op);
      }
    });
    this.updateCollaborators(noo, "openOptions");
  }

  removeCollaborator = user => {
    console.log(`user to be added to openOptions : ${user}, typeof ${typeof user}, user.value ${user.value}`);

    const nue = [...this.state.openOptions, user.value];
    this.updateCollaborators(nue, "openOptions");

    const gnoo = [];
    this.state.project_users.map(yoozer => {
      if (yoozer.value !== user.value) gnoo.push(yoozer);
    });
    this.updateCollaborators(gnoo, "project_users");
  }

  removeFromOpenOptions = userid => {
    const gnoo = [];
    this.state.project_users.map(yoozer => {
      if (yoozer.value !== userid) gnoo.push(yoozer);
    });
    this.updateCollaborators(gnoo, "openOptions");
  }

  handleOpen = () => this.setState({ modalOpen: true });
  handleEditProjectModalClose = () => {
    this.props.onClose();
    this.setState({ modalOpen: false });
  }


  saveProjectEdits = () => {
    // const selectedUsers = [];
    // this.state.project_users.forEach(user => {
    //   console.log(`user of the forEach is ${user}`);
    //   selectedUsers.push(user);
    // });
    // console.log(`selectedUsers: ${selectedUsers}`);
    let list_item = {
      due_date: this.state.due_date,
      name: this.state.name,
      users: this.state.project_users
    }
    console.log('project obj to be sent: ', list_item);
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
  };

  deleteProject = () => {
    this.handleEditProjectModalClose();
    API.deleteProject(this.props.project.id)
      .then(res => {
        console.log('res from deleting the project: ', res);
        this.props.onClose();
      })
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
        [name]: value
    });
  }


  updateDate = (event, period) => {
    
    let { value } = event.target;

    console.log(`updateDate: value, period | ${value}, ${period}`);

    this.setState({ [period]: {
      key: value,
      value: value,
      text: value + "",
    },
    });
    this.updateDueDate();

    console.log(`lastChance ${this.state.lastChance}`);

  }


  updateMonth = event => {
    const { val } = event.target;
    this.setState({ month: {
      key: val,
      value: val,
      text: this.state.dateData.monthMap[val],
    },
    });
    this.updateDueDate();
  }


  formatDate = () => {
    let due = new Date(this.props.project.due_date);
    if (due.getHours() !== 0) due.setHours(24);
    return due.toDateString();
  }


  getProjectDate = () => {
    const date = new Date(this.props.project.due_date);
    if (date.getHours() !== 0) date.setHours(24);
    const yr = date.getFullYear() + "";
    const mo = date.getMonth() + "";
    const day = date.getDate() + "";
    this.setState({ 
      day: {
        key: day,
        value: day,
        text: day,
      }, 
      month: {
        key: mo,
        value: mo,
        text: this.state.dateData.monthMap[mo]
      }, 
      year: {
        key: yr,
        value: yr,
        text: yr,
      } });

    console.log(`this.props.project.due_date ${this.props.project.due_date}`);
  }


  updateDueDate = () => {
    let fecha = new Date();
    console.log(`this.state.day.value ${this.state.day.value}`);
    console.log(`fecha before setDate ${fecha}`);
    fecha.setDate(parseInt(this.state.day.value));
    console.log(`fecha after setDate ${fecha}`);
    fecha.setMonth(parseInt(this.state.month.value));
    fecha.setFullYear(parseInt(this.state.year.value));
    console.log(`updateDueDate ${fecha}`);
    fecha = fecha.toISOString()  //.slice(0, 10);
    console.log(`due_date toISOString ${fecha}`);
    this.setState({ due_date: fecha });
  }


  createDateData = () => {
    let dd = { ...this.state.dateData };
    for (let i = 1; i < 32; i++) {
      dd.days.push({
        key: "d" + i,
        value: i + "",
        text: i + ""
      });
    }
    for (let i = 2018; i < 2030; i++) {
      dd.years.push({
        key: "y" + i,
        value: i + "",
        text: i + ""
      });
    }
    dd.monthlist.forEach((month, i) => {
      dd.monthMap[month] = i + 1;
      dd.monthMap[i + 1] = month;
      dd.months[i] = {
        key: "m" + i,
        value: i + "",
        text: month
      }
    });
    this.setState({ dateData: dd });
    console.log(`!@#$%^&*&^%$%^&%$ this.state.dateData ${this.state.dateData}`);
  }


  dummyFunction = () => {
    console.log(`something's happening!!`);
    console.log(`dateData ${dateData}`);
  }

    ///// for below "usersBox" class div . . . . . . 
                // <div className='selectionsBox'>
                //   {this.state.possible_users.map(user => (
                //     <div
                //       key={`${user.id}two`}
                //       value={user.first_name}
                //       className="modal_users inline"
                //       onClick={() => this.addCollaborator(user.key)}
                //       >{user.text}
                //     </div>
                //     ))}
                // </div>

    /////// for the Dropdown .. . . . 
                // <Dropdown 
                //   className='userDropdown'
                //   placeholder='Modify users...' 
                //   fluid
                //   multiple
                //   search
                //   selection
                //   floating
                //   options={this.state.openOptions}
                //   value={this.state.project_users}
                //   onChange={(event,{value}) => this.updateDropdownCollaborators(value)}
                //   >
                // </Dropdown>
    /////// for below the ProjectNameBar .. . . 
//              <div className='due_date2'> | <span className='due2'>currently due: </span>{this.state.formattedDate}</div><br/>
//              <Input 
//                label='modified project due date'
//                className='inputBar' 
//                type='date' 
//                value={this.state.due_date} 
//                onChange={event => this.setState({due_date: event.target.value})} />

//===========================================

//              <Dropdown
//                className="month dateConstituents"
//                search
//                selection
//                placeholder={this.state.month.text}
//                options={this.state.dateData.months}
//                value={this.state.month.value}
//                name="month"
//                onChange={this.updateMonth} />
//              <Dropdown
//                className="day dateConstituents"
//                search
//                selection
//                placeholder={this.state.day.text}
//                options={this.state.dateData.days}
//                value={this.state.day}
//                name="day"
//               onChange={event => this.updateDate(event, "day")} />
//              <Dropdown
//                className="year dateConstituents"
//                search
//                selection
//                placeholder={this.state.year.text}
//                options={this.state.dateData.years}
//                value={this.state.year} 
//                name="year"
//                onChange={event => this.updateDate(event.target.value, "year")} />

//===========================================

  /////////////////////////////////////////////////////////////////

  render() {
    return (
      <div className="well buttonWell">
        <Modal 
          trigger={<Button onClick={this.handleOpen} className='editButton'><Image src={Edit} width='24' /></Button>}
          open={this.state.modalOpen}
          onOpen={this.loadProjectUsers}
          onClose={this.handleEditProjectModalClose}
          basic
          size='small'
          key={this.props.project.id}>     

          <Modal.Header className='editProjectHeader'>EDIT project</Modal.Header>
          <Modal.Content>
            <Form>
              <Input
                className='projectNameBar inputBar'
                label='project name'
                name="name"
                type="text"
                value={this.state.name}
                onChange={event => this.setState({name: event.target.value})} />

                  <InputLabel value="something"></InputLabel>
                  <Select 
                    value={this.state.age}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-simple',
                    }}
                  >
                    <MenuItem value="5">
                    </MenuItem>
                  </Select>

              <div className='usersBox'>
                <div className="collaborators">current project collaborators: </div>
                <div className='userChipsBox'>
                {this.state.project_users.map(user => (
                  <div 
                    key={user.value}
                    className='modal_users inline'>
                      <div className='userChipText'>{user.text}</div>
                      <div 
                        className='x-box'
                        onClick={() => this.removeCollaborator(user)}
                        >x</div>
                  </div>
                  ))}
                </div>
                <div className='selectionsBox'>
                  <div className="collaborators">add collaborators to project: </div>
                  {this.state.openOptions.map(user => (
                    <div
                      key={`${user.value}two`}
                      value={user.text}
                      className="inline openOptionUsers"
                      onClick={() => this.addCollaborator(user)}
                      ><div className="optionChipText">{user.text}</div>
                    </div>
                    ))}
                </div>

              </div>
            </Form>
          </Modal.Content>
          <Modal.Content>
            <div className='taskListHeader'>Tasks within this project:
            </div>
            <div className='taskListBox'>
            {this.props.project.Tasks.map(task => (
                <div as='h2' key={task.id} className='taskItem'>{task.heading}</div>
            ))}
            </div>
          </Modal.Content>
          <Modal.Actions>
              <Button color='instagram' icon='undo' content='Go Back' onClick={() => this.handleEditProjectModalClose()} inverted />
              <Button color='red' icon='window close' content='Delete Project' onClick={() => this.deleteProject()} inverted />
              <Button color='olive' icon='checkmark' content='Save Project' onClick={() => this.saveProjectEdits()} inverted />
          </Modal.Actions>
        </Modal> 
      </div>
       
    );
  }
}


export default EditProjectModal;
