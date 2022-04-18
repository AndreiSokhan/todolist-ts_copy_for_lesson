import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
   id: string,
   title: string,
   filter: FilterValuesType
}
export type taskObjectType = {
   [key: string]: Array<TaskType>
}

function App() {
   let todolistID1 = v1();
   let todolistID2 = v1();

   let [todolists, setTodolists] = useState<Array<TodolistType>>([
      {id: todolistID1, title: "What to learn", filter: 'all'},
      {id: todolistID2, title: "What to buy", filter: 'all'},
   ])

   let [tasks, setTasks] = useState<taskObjectType>({
      [todolistID1]: [
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Rest API", isDone: false},
         {id: v1(), title: "GraphQL", isDone: false},
      ],
      [todolistID2]: [
         {id: v1(), title: "Book", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "IDE", isDone: false},
         {id: v1(), title: "Laptop", isDone: false},
         {id: v1(), title: "Display", isDone: false},
      ],
   });

   const removeTodolist = (todolistID: string) => {
      setTodolists(todolists.filter(el => el.id !== todolistID))
      delete tasks [todolistID]
      // console.log(todolistID)
   }


   function addTask(todolistID: string, title: string) {
      let newTask = {id: v1(), title: title, isDone: false};
      setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
   }

   const addTodolist = (newTitle: string) => {
      let newID = v1()
      setTodolists([{id: newID, title: newTitle, filter: 'all'}, ...todolists])
      setTasks({...tasks, [newID]: []})
   }

   const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
      setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)})
   }

   const updateTodolistTitle = (todolistID: string, newTitle: string) => {
      setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
   }

   function changeStatus(todolistID: string, taskId: string, isDoneValue: boolean) {
      setTasks({
         ...tasks,
         [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDoneValue} : el)
      })
   }

   function changeFilter(todolistID: string, value: FilterValuesType) {
      setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
      // setFilter(value);
   }

   function removeTask(todolistID: string, taskID: string) {
      setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
   }

   return (
      <div className="App">
         <AddItemForm callBack={addTodolist}/>

         {todolists.map((el) => {
            let tasksForTodolist = tasks[el.id];
            if (el.filter === "active") {
               tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
            }
            if (el.filter === "completed") {
               tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
            }

            return (
               <Todolist
                  key={el.id}
                  id={el.id}
                  todolistID={el.id}
                  title={el.title}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  filter={el.filter}
                  removeTodolist={removeTodolist}
                  updateTask={updateTask}
                  updateTodolistTitle={updateTodolistTitle}
               />
            )
         })
         }
      </div>
   );
}

export default App;
