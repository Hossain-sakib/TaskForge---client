import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/UseAuth";
import TodosCard from "../TodosCard/TodosCard";


const TodosCompleted = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const [todos, setTodos] = useState();
    useEffect(()=>{
        axiosPublic.get(`/todos?email=${user?.email}`)
        .then(result=>{
            setTodos(result.data);
            
        })
    })
    return (
        <div>
            <div>
                <h1 className="text-2xl font-medium">Completed</h1>
                {
                    todos?.map(element=> element.status=="completed"? <TodosCard key={element._id} todo={element}></TodosCard> : <></>)
                }
                
            </div>
        </div>
    );
};

export default TodosCompleted;