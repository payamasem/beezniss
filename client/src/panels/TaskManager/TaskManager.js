import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { FormBtn } from "../../components/Form";
import TaskModal from "../../components/TaskModal";
import ProjectModal from "../../components/ProjectModal";
import AddTaskModal from "../../components/AddTaskModal";
import _ from 'lodash';
import { Accordion, Content, Icon, Label, Button, Form, Field, Group, TextArea, Input, Grid, Column, Row } from 'semantic-ui-react';
import "./TaskManager.css";

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
    }
  };

  componentDidMount() {
    this.loadTasks();
    this.loadUsers();
  }

  loadTasks = () => {
    API.getTasks()
      .then(res => {
        console.log('UNSORTED getTasks res.data = ', res.data);
        this.sortResData(res.data);
      })
      .catch(err => console.log(err));
  };
  loadUsers = () => {
    API.getUsers()
      .then(userRez => {
        this.setState({ users: userRez.data });
        console.log('userRez: ', userRez.data);
      })
      .catch(err => console.log(err));
  };

  deleteTask = id => {
    API.deleteTask(id)
      .then(res => this.loadTasks())
      .catch(err => console.log(err));
  };

  sortResData = obj => {
    const nest = {
      Projects: obj.Projects,
      Tasks: obj.Tasks
    };

    //====================
    //== for each project, 
    //== find any tasks with a matching project id
    //== and put them in the array of that project's tasks

    for (let i = 0; i < obj.Projects.length; i++) {
          //  for ex., Project[1] has an id === 7
      let tasksPerProject = 0;

      for (let j = 0; j < obj.Tasks.length; j++) {
        // for ex., Tasks[3] has an id == 9, project_id == 7
        if (obj.Projects[i].id === obj.Tasks[j].project_id) {
          nest.Projects[i].Tasks.unshift(obj.Tasks[j]);
          nest.Projects[i].Tasks.pop();
          tasksPerProject++;
        }
      }
    }

    this.setState({
      projects: nest.Projects,
      tasks: nest.Tasks
    });
    console.log("AFTER sorting, projects & tasks: ", this.state.projects);
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      task: {
        [name]: value
      }
    });
  };

  formatDate = i => {
    console.log("the due date is ", this.state.projects[i].due_date);
    let due = new Date(this.state.projects[i].due_date);
    let dueDate = due.toDateString();
    console.log('the FORMATTED due date is ', dueDate);
    return dueDate;
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.task.heading) {
      API.createTask({
        heading: this.state.task.heading,
        description: this.state.task.description
      })
      .then(res => {
        console.log('task created!! -- ', res.data);
        this.loadTasks();
        this.setState({
          task: {
            heading: "",
            description: ""
          }
        });
      })      
      .catch(err => console.log(err));
    }
  };

  // ==================================
  // ==================================
  // ==================================

  render() { 

    const panel = _.times(this.state.projects.length, i => ({
      title: {
        content: (<Label 
            color='' 
            size='big' 
            className='projectLabel'>
            <div className='projectName'>{this.state.projects[i].name}</div>
            {this.state.projects[i].Users.map(user => (
              <div className='little_user'>
                {user.first_name}
              </div>
              ))}
              <div className='due_date'> | <span className='due'>due: </span>{this.formatDate(i)}</div>
            </Label>),
        key: `title-${i}`,
      },
      content: {
        content: (
          <div>
            {this.state.projects[i].Tasks.map(tasq => (
              <TaskModal 
                  task={tasq} 
                  tasks={this.state.projects[i].Tasks}
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
        <div className='subMain'>
          <div>
            <h1>Task Manager</h1>
          </div>
          <div className='subSubMain'>
            <Accordion panels={panel} /> 
          </div>
          <ProjectModal 
            users={this.state.users}
            onClose={() => this.loadTasks()} />
        </div>
      </div>

      )
  }
}

export default TaskManager;
