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
      name: ""
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
        console.log("res = ", res);
        console.log('res.data = ', res.data);
        this.setState({ 
          projectsGotten: res.data.projects,
          tasksGotten: res.data.tasks, 
          checklistItemsGotten: res.data.checklist_items,
          heading: "", 
          description: "" })
      })
      .catch(err => console.log(err));
  };

  deleteTask = id => {
    API.deleteTask(id)
      .then(res => this.loadTasks())
      .catch(err => console.log(err));
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
      .then(res => this.loadTasks())
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
                        {task.heading}"
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
