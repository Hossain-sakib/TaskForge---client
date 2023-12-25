import Swal from "sweetalert2";
import useAuth from "../../Hooks/UseAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const TodosAdd = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const handleAddTodo = e => {
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
            .then(result => {
                if (result.data.acknowledged) {
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
        <div className="bg-blue-50">
            <div className="p-4 md:p-10">
                <h1 className="text-center text-blue-600 font-medium text-4xl">Note Your Tasks Here</h1>
                <div className="pt-4">
                    <form onSubmit={handleAddTodo} className="flex flex-col md:flex-row justify-center md:items-center gap-4">
                        <input name="title" type="text" className="input input-bordered rounded-none border-blue-300" placeholder="Task Title" />
                        <input name="description" type="text" className="input input-bordered rounded-none border-blue-300" placeholder="Task Description" />
                        <input name="deadline" type="date" className="input input-bordered rounded-none border-blue-300" />
                        <input name="deadline_time" type="time" className="input input-bordered rounded-none border-blue-300" />
                        <select name="priority" className="select select-bordered rounded-none border-blue-300">
                            <option disabled defaultValue>Select Priority</option>
                            <option value='low'>Low</option>
                            <option value='moderate'>Moderate</option>
                            <option value='high'>High</option>
                        </select>
                        <input type="submit" value="Add Task" className="btn btn-outline rounded-none bg-blue-200 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl  " />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TodosAdd;