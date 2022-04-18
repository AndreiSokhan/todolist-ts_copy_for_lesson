import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   id: string
   title: string
   todolistID: string
   tasks: Array<TaskType>
   removeTask: (todolistID: string, taskId: string) => void
   changeFilter: (todolistID: string, value: FilterValuesType) => void
   addTask: (todolistID: string, title: string) => void
   changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
   filter: FilterValuesType
   removeTodolist: (todolistID: string) => void
   updateTask: (todolistID: string, taskID: string, newTitle: string) => void
   updateTodolistTitle: (todolistID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
   // const addTask = (title: string) => {
   //    props.addTask(title);
   // }

   const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
   const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
   const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
   const removeTodolistHandler = () => {
      props.removeTodolist(props.todolistID)
   }

   const addTaskHandler = (newTitle: string) => {
      props.addTask(newTitle, props.id)
   }

   const updateTaskHandler = (taskID: string, newTitle: string) => {
      props.updateTask(props.id, taskID, newTitle)
   }

   const EditableSpanForH3Handler = (newTitle:string) => {
      props.updateTodolistTitle(props.id, newTitle)
   }

   return <div>
      <h3>
         {/*{props.title}*/}
         <EditableSpan title={props.title} callBack={EditableSpanForH3Handler}/>
         <button onClick={removeTodolistHandler}>x</button>
      </h3>
      <AddItemForm callBack={addTaskHandler}/>
      <ul>
         {
            props.tasks.map(t => {
               const onClickHandler = () => props.removeTask(props.todolistID, t.id)
               const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
               }

               return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                  <button onClick={onClickHandler}>x</button>
                  <input type="checkbox"
                         onChange={onChangeHandler}
                         checked={t.isDone}/>
                  <EditableSpan title={t.title} callBack={(newTitle: string) => updateTaskHandler(t.id, newTitle)}/>
                  {/*<span>{t.title}</span>*/}
               </li>
            })
         }
      </ul>
      <div>
         <button className={props.filter === 'all' ? "active-filter" : ""}
                 onClick={onAllClickHandler}>All
         </button>
         <button className={props.filter === 'active' ? "active-filter" : ""}
                 onClick={onActiveClickHandler}>Active
         </button>
         <button className={props.filter === 'completed' ? "active-filter" : ""}
                 onClick={onCompletedClickHandler}>Completed
         </button>
      </div>
   </div>
}
