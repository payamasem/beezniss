import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import "./TaskManager.css";

class TaskManager extends Component {
  state = {
    projectsGotten: [],
    tasksGotten: [],
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
    // this.loadSales();
  }

  loadTasks = () => {
    API.getTasks()
      .then(res => {
        console.log("getTasks res = ", res);
        console.log('UNSORTED getTasks res.data = ', res.data);
        // this.setState({ 
        //   projectsGotten: res.data.projects,
        //   tasksGotten: res.data.tasks, 
        //   checklistItemsGotten: res.data.checklist_items,
        //   heading: "", 
        //   description: "" })
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
      projectsGotten: nest.Projects,
      tasksGotten: nest.Tasks
    });
    console.log("POST sorting, projectsGotten: ", this.state.projectsGotten);
  };

  // loadSales = () => {
  //   API.getSales()
  //     .then(res => {
  //       console.log('Cookies res.data = ', res.data);
  //     })
  // }


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

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <div>
              <h1>Task Manager</h1>
            </div>
            <form>
              <h2>create new task</h2>
              <Input
                value={this.state.task.heading}
                onChange={this.handleInputChange}
                name="heading"
                placeholder="heading (required)"
                type="text"
              />
              <Input
                value={this.state.task.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="description"
                type="text"
              />
              <FormBtn
                disabled={!(this.state.task.heading)}
                onClick={this.handleFormSubmit}
              >
                Submit Task
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <div>
              <h1>tasks from the database</h1>
            </div>
            {this.state.tasksGotten.length ? (
              <List>
                {this.state.tasksGotten.map(task => (
                  <ListItem key={task.id}>

                      <strong>
                        {task.heading}
                      </strong><br/>
                        {task.description}

                      <DeleteBtn onClick={() => this.deleteTask(task.id)} />

                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TaskManager;
