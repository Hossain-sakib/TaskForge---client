import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AddTask = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const onSubmit = async (data) => {
        console.log(data)
        const taskItem = {
            taskTitle: data.taskTitle,
            taskDetails: data.taskDetails,
            email: user?.email
        }

        const taskRes = await axiosPublic.post('/addtask', taskItem);
        console.log(taskRes.data)
        if (taskRes.data.insertedId) {
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Task Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-blue-100 rounded-none border-2 border-blue-600 p-4">
                <form className="flex flex-col justify-center space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Title"
                            {...register('taskTitle', { required: true })}
                            required
                            className="input border-blue-400 rounded-none input-bordered" />
                    </div>
                    <div className="">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Task Details</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Task Details"
                                {...register('taskDetails', { required: true })}
                                className="input border-blue-400 rounded-none input-bordered" />
                        </div>

                    </div>
                    <button className="btn bg-blue-300 hover:bg-blue-400 font-bold rounded-none overflow-hidden transition-all hover:scale-105  hover:shadow-2xl">
                        ADD TASK
                    </button>
                </form>

            </div>
        </div>


    );
};

export default AddTask;