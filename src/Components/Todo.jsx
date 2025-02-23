import { useRef, useState , useEffect} from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

    const inputRef = useRef(null)
    const [todolist , settodolist] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
    
    
    // Add Task
    const addTask = ()=>{
        const inputText = inputRef.current.value.trim();
        if(!inputText)return alert("Task bar is empty")
        const newTodo = {
            id: Date.now(),
            text : inputText,
            isComplete : false, // for task check and un-check
            isEditing: false   //for editing logic
        }

        settodolist((prev)=>{
            // console.log("prevtodo list before updating ",prev)
            return [...prev,newTodo]
        })
        inputRef.current.value = "";
    }
    // Enter Key eventlistner
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    };

    // delete task 
    const deletetodo = (id)=>{

        settodolist((prev)=>{

            // console.log("prevtodo list before deleting ",prev)
            return prev.filter((list)=>{
                return list.id !== id  //update the list[] by create a new array and adding(returning) the only list whoes id dosnt match  
            })
        })

    }

    //check uncheck 
    const toggle = (id)=>{
        settodolist((prev)=>{
            return prev.map((list)=>{
                if(list.id === id){
                    return {...list , isComplete : !list.isComplete }
                }
                return list
            })
        })
    }

    /*Edit task*/
        //Activate Edit Mode
        const toggleEdit = (id) => {
            settodolist((prev) => {
                return prev.map((list) =>
                    list.id === id ? {...list, isEditing: !list.isEditing } : list
                );
            });
        }
        //Update task
        const edittodo =(id, newText) => {
            settodolist((prev) => {
                return prev.map((todo) =>
                    todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
                );
            });
        }


    useEffect(()=>{
       localStorage.setItem("todos", JSON.stringify(todolist) )

    },[todolist])

    return (
        <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[490px] rounded-xl ">

            {/*---- title--- */}
            <div className="flex items-center mt-7 gap-2">
                <img className="w-8" src={todo_icon} alt="task" />
                <h1 className="text-3xl font-semibold">TO-DO LIST</h1>
            </div>

            {/*---- input-box--- */}
            <div className="flex items-center my-7 bg-gray-200 rounded-full">
                    <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2  placeholder:text-slate-600"  type="text" placeholder="Enter your To-do Task"  onKeyDown={handleKeyDown} />
                    <button className="border-none rounded-full bg-orange-600 w-26 h-14 text-white text-lg fondt-medium cursor-pointer" onClick={addTask}>ADD+</button>
            </div>

            {/*---- list of task--- */}
            <div>
                {
                    todolist.map((eachTask)=>{ 
                        return <TodoItems 
                            key={eachTask.id}  
                            id={eachTask.id} 
                            task = {eachTask}  
                            deletetodo={deletetodo}
                            toggle={toggle}
                            toggleEdit={toggleEdit} 
                            edittodo={edittodo}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default Todo


/* (ANSWER)
Immutability in React State
In React, state should be immutable, meaning we should never directly modify the state. 
Instead, we create a new copy of the state, modify the copy, and
 then update the state with the new version.

Why is it Important?
State Detection: React uses shallow comparisons to detect changes in state. 
If we modify the state directly (e.g., using .push() on an array),
 React may not detect the change and won’t update the UI.
*/



