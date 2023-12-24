import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AddTask = () => {
    const {user}=useContext(AuthContext)
    const { register, handleSubmit ,reset } = useForm()
    const axiosPublic=useAxiosPublic();
    const onSubmit = async (data) => {
        console.log(data)
            const menuItem = {
                task: data.task,
                workdetails:data.workdetails,
                email:user?.email  
            }
            
            const menuRes = await axiosPublic.post('/addtask', menuItem);
            console.log(menuRes.data)
            if(menuRes.data.insertedId){
                   reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title:"Task Added Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            
    
}

    return (
        <div>
         
            <div className="w-1/2 mx-auto shadow-lg lg:absolute top-10 left-[400px]  bg-slate-400">
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Work Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="task"
                            {...register('task', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="">
                        {/* category */}
                       

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Work Details</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Work Details"
                                {...register('workdetails', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    

                    

                    <button className="btn shadow-[0_9px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black bg-white ease-out hover:translate-y-1 transition-all rounded">
  ADD_TASK
</button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;