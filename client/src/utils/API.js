import axios from "axios";

export default {
  //  ===================================
  //========== TaskManager paths ==========
  //  ===================================
  // Gets all tasks
  getTasks: function() {
    return axios.get("/api/tasks");
  },
  // Gets the Task with the given id
  getTask: function(id) {
    return axios.get("/api/tasks/" + id);
  },
  // Deletes the Task with the given id
  deleteTask: function(id) {
    return axios.delete("/api/tasks/" + id);
  },
  // Saves a Task to the database
  createTask: function(taskData) {
    return axios.post("/api/tasks", taskData);
  },
  editTask: function(id, taskData) {
    return axios.post("/api/tasks/" + id, taskData);
  },
  getUsers: function() {
    return axios.get("/api/tasks/users");
  },
  createProject: function(listData) {
    return axios.post("/api/tasks/project", listData);
  },
  editProject: function(id, projectData) {
    return axios.post("/api/tasks/project/" + id, projectData);
  },
  deleteProject: function(id) {
    return axios.delete("/api/tasks/project/" + id);
  },
  createChecklistItem: function(listData) {
    return axios.post("/api/tasks/checklistitem", listData);
  },
  editChecklistItem: function(id, checklistData) {
    return axios.post("/api/tasks/checklistitem/" + id, checklistData);
  },
  deleteChecklistItem: function(id) {
    return axios.delete("/api/tasks/checklistitem/" + id);
  },
  //  ===================================
  //========== SalesTracker path ==========
  //  ===================================  
  // Gets all sales data
  getSales: function() {
    return axios.get("/api/sales");
  },
};
