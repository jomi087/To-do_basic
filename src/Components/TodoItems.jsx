import tick from '../assets/tick.png'
import deleteIcon from '../assets/delete.png'
import not_tick from '../assets/not_tick.png'

import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from 'react';


const TodoItems = ({task,deletetodo,toggle,toggleEdit,edittodo}) => {  //jst destructure from props.task =>  task etc...
  const [edittodoText, setedittodoText] = useState(task.text);

  const handleChange = (e) => {
    setedittodoText(e.target.value);
  };


  return (
    <div className="flex items-center my-3 gap-2">
        <div onClick={()=>{toggle(task.id)}} className="flex flex-1 items-center cursor-pointer ml-6" >

            <img className="w-5" src={ task.isComplete ? tick : not_tick } alt="tick_icon" />
            { task.isEditing ? (                    
                <input 
                  type="text" 
                  value={edittodoText} 
                  onChange={handleChange}
                  onBlur={() => edittodo(task.id, edittodoText)} // Handle when input loses focus
                  autoFocus
                  className="text-slate-700 ml-4 text-[17px] outline-none" /> 
                
              ):(
                <p style={{ wordBreak: "break-word", maxWidth: "90%" }}  className={`text-slate-700 ml-4 text-[16px] break-words overflow-hidden ${task.isComplete ? "line-through" : ""}`} >   
                  {task.text}
                </p>
              )
            }
        </div> 
        <button onClick={()=>{toggleEdit(task.id)}} className="cursor-pointer"><FaEdit/></button>
        <img onClick={()=>{deletetodo(task.id)}} className="w-4 cursor-pointer" src={deleteIcon} alt="delete_icon" />
    </div>
  )
}

export default TodoItems
