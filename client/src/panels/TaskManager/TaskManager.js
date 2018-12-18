import React, { Component } from "react";
import API from "../../utils/API";
import AddTaskModal from "../../components/AddTaskModal";
import EditTaskModal from "../../components/EditTaskModal";
import AddProjectModal from "../../components/AddProjectModal";
import EditProjectModal from "../../components/EditProjectModal";
import _ from 'lodash';
import { Accordion, Label } from 'semantic-ui-react';
import "../CSS/Panels.css";

class TaskManager extends Component {
  state = {
    projects: [],
    tasks: [],
    checklistitems: [],
    users: [],
    user: {
      first_name: "",
      last_name: ""
    },
    project: {
      name: "",
      task_id: ""
    },
    task: {
      heading: "",
      description: "",
      due_date: ""
    },
    shadow: "0",
    borderBottom: "none",
  };

  componentDidMount() {
    this.loadTasks();
    this.loadUsers();
  }

  loadTasks = () => {
    API.getTasks()
      .then(res => {
        console.log("REZ DATA", res.data);
        // this.setState({ projects: res.data.Projects, tasks: res.data.Tasks });
        this.sortResData(res.data);
      })
      .catch(err => console.log(err));
  }
  loadUsers = () => {
    API.getUsers()
      .then(userRez => {
        this.setState({ users: userRez.data });
      })
      .catch(err => console.log(err));
  }

  deleteTask = id => {
    API.deleteTask(id)
      .then(res => this.loadTasks())
      .catch(err => console.log(err));
  }

  sortResData = obj => {
    const nest = { Projects: obj.Projects };

    //====================
    //== for each project, 
    //== find any tasks with a matching project id
    //== and put them in the array of that project's tasks

    for (let i = 0; i < obj.Projects.length; i++) {
      //  for ex., Projects[1] has an id === 6
      for (let j = 0; j < obj.Tasks.length; j++) {
        // for ex., Projects[3] has an id == 9, Tasks[2].project_id == 7
        if (obj.Projects[i].id === obj.Tasks[j].project_id) {
          nest.Projects[i].Tasks.unshift(obj.Tasks[j]);
          nest.Projects[i].Tasks.pop();
        }
      }
    }

    this.setState({
      projects: nest.Projects,
      tasks: obj.Tasks,
    });

    // this.sortByDate(nest.Projects);
  }

  sortByDate = (progetti) => {
    let progettiNuovi = [];
    progettiNuovi[0] = progetti[0];

    for (let i = 0; i < progetti.length; i++) {
      for (let j = 0; j < progettiNuovi.length; j++) {
        if (progetti[i].due_date > progettiNuovi[j].due_date) {
          progettiNuovi.splice(j + 1, 0, progetti[i]);
        }
        else if (j === progettiNuovi.length - 1) {
          progettiNuovi.splice(j, 0, progetti[i]);
        }
      }
    }
    this.setState({ projects: progettiNuovi });
  }

  formatDate = i => {
    let due = new Date(this.state.projects[i].due_date);
    if (due.getHours() !== 0) due.setHours(24);
    let dueDate = due.toDateString();
    return dueDate;
  }

  // ==================================
  // ==================================
  // ==================================

  render() { 
    const scrollStyle = { boxShadow: this.state.shadow, transition: "box-shadow 1.5s", borderBottom: this.state.borderBottom };
    const panel = _.times(this.state.projects.length, i => ({
      title: {
        content: (
          <Label 
            size='big' 
            className='projectLabel'>
            <div className='projectName'>{this.state.projects[i].name}</div>
            <div className='userLine'>
            {this.state.projects[i].Users.map(user => (
              <div className='little_user' key={user.id}>
                {user.first_name}
              </div>
              ))}
            </div>
            <div className='due-button-row'>
              <div className='displayInline'>
                <div className='due_date'> | <span className='due'>due: </span>{this.formatDate(i)}
                </div>
              </div>
              <EditProjectModal
                users={this.state.users}
                project={this.state.projects[i]}
                key={this.state.projects[i].id}
                onOpen={() => this.loadTasks()}
                onClose={() => this.loadTasks()} />
            </div>
          </Label>),
        key: `title-${i}`,
      },
      content: {
        content: (
          <div className='accordionedTaskBox'>
            {this.state.projects[i].Tasks.map(tasq => (
              <EditTaskModal 
                  task={tasq}
                  project={this.state.projects[i]}
                  tasks={this.state.projects[i].Tasks}
                  key={tasq.id}
                  onClose={() => this.loadTasks()}  />
              ))}
            <AddTaskModal 
              possible_users={this.state.projects[i].Users} 
              project_id={this.state.projects[i].id} 
              onClose={() => this.loadTasks()} />
          </div>
        ),
        key: `content-${i}`,
      },
    }));

    return (
      <div className='main'>
        <div className="panelHeaderRow" style={scrollStyle}>
          <h1>Task Manager</h1>
        </div>
        <div className='subMain'>
          <div className='subSubMain'>
            <Accordion panels={panel} /> 
          </div>
          <AddProjectModal 
            users={this.state.users}
            onClose={() => this.loadTasks()} />
        </div>
      </div>

      )
  }
}

export default TaskManager;
