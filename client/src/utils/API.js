import axios from "axios";

export default {
  //  ===================================
  //========== TaskManager paths ==========
  //  ===================================
  // Gets all books
  getTasks: function() {
    return axios.get("/api/tasks")
      .then(function(res) {
      console.log("axios res.data: ", res.data);
      })
      .catch(function(err) {
        console.log("axios error: ", err);
      });
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

  //  ===================================
  //========== SalesTracker paths ==========
  //  ===================================  
  // Gets all books
  getSales: function() {
    return axios.get("/api/sales");
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
