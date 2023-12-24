import { useContext } from "react";
import { FirebaseContext } from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const AddTodos = () => {
    const {user} = useContext(FirebaseContext);
    const axiosPublic = useAxios();
    const handleAddTodo = e =>{
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const deadline = form.deadline.value;
        const priority = form.priority.value;
        const deadline_time = form.deadline_time.value;
        const result = {
            title, description, deadline, deadline_time, priority, user: user?.email, status: "pending"
        }

        axiosPublic.post("/todos", result)
        .then(result=>{

            if(result.data.acknowledged){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Task has been added!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
            }
        })
    }
    return (
        <div>
            <div className="p-4 md:p-10">
                <h1 className="text-center font-medium text-4xl">What's on your mind today?</h1>
                <div className="pt-4">
                    <form onSubmit={handleAddTodo} className="flex flex-col md:flex-row justify-center md:items-center gap-4">
                        <input name="title" type="text" className="input input-bordered" placeholder="Task Title" />
                        <input name="description" type="text" className="input input-bordered" placeholder="Task Description" />
                        <input name="deadline" type="date" className="input input-bordered" />
                        <input name="deadline_time" type="time" className="input input-bordered" />
                        <select name="priority" className="select select-bordered">
                            <option disabled selected>Select Priority</option>
                            <option value='low'>Low</option>
                            <option value='moderate'>Moderate</option>
                            <option value='high'>High</option>
                        </select>
                        <input type="submit" value="Add Task" className="btn" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTodos;