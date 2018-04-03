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
    console.log('task to be created: ', taskData);
    return axios.post("/api/tasks", taskData);
  },
  editTask: function(id, taskData) {
    return axios.post("/api/tasks/" + id, taskData);
  },


  //  ===================================
  //========== SalesTracker path ==========
  //  ===================================  
  // Gets all sales data
  getSales: function() {
    console.log('getSales function triggered in API');
    return axios.get("/api/sales");
  },

  //  ===================================
  //========== Messenger paths ============
  //  ===================================
  getMessages: function() {

  },
  saveMessage: function() {

  }
};
