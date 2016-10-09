/*
 * Magro implementation - Hackathon Project HackNY fall 2016
 *
 * Magro.js is responsible for:
 * -managing incoming macro-task data
 * -making data readable and accessible
 * -linking the macro-tasks together by rank of priority
 */
function Magro(name,deadline,startDate,importance)
{
  //pertinent information about our magro
  this.name = name;//string
  this.deadline = deadline;//Date object
  this.startDate = startDate;//Date object
  this.importance = importance;//string
  //rank from 1 to 10
  //1 is the highest 
  this.finished = false;
  this.numTasks = 0;
  
  //relate this magro to other magros
  this.upper = null;
  this.lower = null;
  this.alongside = null;
  //each magro will have a list of task completions 
  //(think of git commit log)
  
  //start with empty tasklist
  this.taskList = [];

  //helper functions
  this.setName = function(name)
  {
    this.name = name;
  }
  
  this.setDeadline = function(deadline)
  {
    this.deadline = deadline;
  }
  //This will eventually cause a reordering or rebalance, idk how I want to do that yet. 
  //Am I going to create a tree object or a queue object?  
  this.setImportance = function(importance)
  {
    this.importance = importance;
  }

  this.getName = function()
  {
    return this.name.toString();
  }

  this.getDeadline = function()
  {
    return this.deadline.toString();
  }

  this.getImportance = function()
  {
    return this.importance; //don't need string
  }

  this.getStartDate = function()
  {
    return this.startDate.toString();
  }

  this.getNumTasks = function()
  {
    return this.taskList.length;
  }

  //getTaskList returns an array of strings
  this.getTaskList = function()
  {
    if(this.taskList.length == 0)
    {
      return "No tasks written.";
    }

    var taskStrings = "";
    for (var i = 0; i < this.taskList.length; i++)
    {
      for(var field in this.taskList[i])
      {
        taskStrings += this.taskList[i][field] + " : ";
      }
      taskStrings += "\n";
    }
    return taskStrings;
  }



  //let's add a task
  this.doTask = function(message)
  {
    var task = {}

    task['number'] = this.numTasks+1; //start counting at one
    this.numTasks++;

    task['message'] = message;    
    
    //when did we finish this task?
    var now = new Date();
    task['commitTime'] = now.toString();
    
    this.taskList.push(task);
   
    return "Task added!";
  }

  //DLL shit
  this.link = function(otherMagro)
  {
    var otherImportance = otherMagro.getImportance();
    if(otherImportance != this.importance)
    {
      console.log("reorder");
      if(otherImportance > this.importance)
      {
        this.upper = otherMagro;
      }
      else this.lower = otherMagro;
    }
    else 
    {
      console.log("the same");
      this.alongside = otherMagro;
    }
  }

  //finishing a task
  this.finishMagro = function()
  {
    if(this.numTasks === 0)
    {
      this.finished = false;
      return "You haven't completed any tasks toward finishing this.\nIf you don't want to do this task/made it on mistake, delete it instead.";
    }
    this.finished = true;
    return "You're all done!";
  }
  


  


}
//TEST CODE//

var now = new Date();
var deadline = new Date();

deadline.setHours(now.getHours()+1);


var sampleMagro = new Magro("Make my first magro",deadline, now, 1);
var sampleMagro2 = new Magro("GET DAT PAPER", deadline, now, 2);
sampleMagro.doTask("Started");
sampleMagro.doTask("From");
sampleMagro.doTask("The Bottom");

console.log(sampleMagro.getTaskList());

sampleMagro.link(sampleMagro2);
console.log(sampleMagro.alongside.getDeadline());





