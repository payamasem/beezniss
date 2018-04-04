import React from "react";
import API from "../../utils/API";



export default {


  loadTasks: function() {
    API.getTasks()
      .then(res => {
        console.log('UNSORTED getTasks res.data = ', res.data);
        this.sortResData(res.data);
      })
      .catch(err => console.log(err));

  },

  sortResData: function(obj) {
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
  }



}