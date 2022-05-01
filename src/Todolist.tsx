import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   id: string
   todolistID: string
   title: string
   tasks: Array<TaskType>
   removeTask: (todolistID:string, taskId: string) => void
   changeFilter: (todolistID: string, value: FilterValuesType) => void
   addTask: (todolistID:string, title: string) => void
   changeTaskStatus: (todolistID:string, taskId: string, isDone: boolean) => void
   filter: FilterValuesType
   removeTodolist:(todolistID:string)=>void
}

export function Todolist(props: PropsType) {

   const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
   const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
   const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

   const removeTodolistHandler=()=>{
      props.removeTodolist(props.todolistID)
   }

   const addTaskHandler=(newTitle: string)=>{
      props.addTask(newTitle, props.id)
   }

   return <div>
      <h3>
         {props.title}
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
                  <input type="checkbox"
                         onChange={onChangeHandler}
                         checked={t.isDone}/>
                  <EditableSpan title={t.title}/>
                  {/*<span>{t.title}</span>*/}
                  <button onClick={onClickHandler}>x</button>
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
