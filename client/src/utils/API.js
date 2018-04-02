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
  //========== SalesTracker paths ==========
  //  ===================================  
  // Gets all sales data
  getSales: function() {
    return axios.get("/api/sales");
  },
  createCookie: function() {
    return axios.post("/api/sales/cookies")
  },

  //  ===================================
  //========== Messenger paths ============
  //  ===================================
  getMessages: function() {

  },
  saveMessage: function() {

  },


  //  ===================================
  //========== Twitter paths ==============
  //  ===================================
  getTweets: function() {
    return axios.get("api/tweets");
  }
};
