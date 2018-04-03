import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { FormBtn } from "../../components/Form";
import TaskModal from "../../components/TaskModal";
import _ from 'lodash';
import { Accordion, Content, Icon, Label, Button, Form, Field, Group, TextArea, Input, Grid, Column, Row } from 'semantic-ui-react';
import "./TaskManager.css";

class TaskManager extends Component {
  state = {
    projects: [],
    tasks: [],
    checklistItemsGotten: [],
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
  }

  loadTasks = () => {
    API.getTasks()
      .then(res => {
        console.log('UNSORTED getTasks res.data = ', res.data);
        this.sortResData(res.data);
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
    console.log("POST sorting, projects: ", this.state.projects);
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      task: {
        [name]: value
      }
    });
  };

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

  // render() {
  //   return (
  //     <Container fluid>
  //       <Row>
  //         <Col size="md-6">
  //           <div>
  //             <h1>Task Manager</h1>
  //           </div>
  //           <form>
  //             <h2>create new task</h2>
  //             <Input
  //               value={this.state.task.heading}
  //               onChange={this.handleInputChange}
  //               name="heading"
  //               placeholder="heading (required)"
  //               type="text"
  //             />
  //             <Input
  //               value={this.state.task.description}
  //               onChange={this.handleInputChange}
  //               name="description"
  //               placeholder="description"
  //               type="text"
  //             />
  //             <FormBtn
  //               disabled={!(this.state.task.heading)}
  //               onClick={this.handleFormSubmit}
  //             >
  //               Submit Task
  //             </FormBtn>
  //           </form>
  //         </Col>
  //         <Col size="md-6 sm-12">
  //           <div>
  //             <h1>tasks from the database</h1>
  //           </div>
  //           {this.state.tasksGotten.length ? (
  //             <List>
  //               {this.state.tasksGotten.map(task => (
  //                 <ListItem key={task.id}>

  //                     <strong>
  //                       {task.heading}
  //                     </strong><br/>
  //                       {task.description}

  //                     <DeleteBtn onClick={() => this.deleteTask(task.id)} />

  //                 </ListItem>
  //               ))}
  //             </List>
  //           ) : (
  //             <h3>No Results to Display</h3>
  //           )}
  //         </Col>
  //       </Row>
  //     </Container>
  //   );
  // }

  // ==================================
  // ==================================
  // ==================================


  // handleOpen = () => this.setState({ modalOpen: true });
  // handleClose = () => this.setState({ modalOpen: false });

  render() { 

    const panel = _.times(this.state.projects.length, i => ({
      title: {
        content: (<Label color='' size='big' content={this.state.projects[i].name} />),
        key: `title-${i}`,
      },
      content: {
        content: (<TaskModal tasks={this.state.projects[i].Tasks} key={this.state.projects[i].id} />),
        key: `content-${i}`,
      },
    }));

    return (
      <div className='main'>
        <div>
          <div>
            <h1>Task Manager</h1>
          </div>
          <div>
            <Accordion panels={panel} /> 
          </div>
          <div className='addProjectButtonDiv'>
            <Button color='yellow' className="addProjectButton">Add Project</Button>
          </div>
        </div>
      </div>

      )

  }



}



export default TaskManager;
