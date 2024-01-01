import { FaArrowRight, FaCheck, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const TodosCard = ({ todo, onActionComplete }) => {
  const { title, deadline, description, deadline_time, _id, status } = todo;
  const axiosPublic = useAxiosPublic();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove !",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/todos/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Removed!",
              text: "The task has been removed.",
              icon: "success",
            });
            if (onActionComplete) {
              onActionComplete();
            }
          }
        });
      }
    });
  };

  const handleOngoing = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this task as ongoing?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it as ongoing!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/todos/${id}`, { status: "ongoing" }).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "The task has been marked as ongoing.",
              icon: "success",
            });
            if (onActionComplete) {
              onActionComplete();
            }
          }
        });
      }
    });
  };

  const handleComplete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this task as completed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it as completed!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/todos/${id}`, { status: "completed" }).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "The task has been marked as completed.",
              icon: "success",
            });
            if (onActionComplete) {
              onActionComplete();
            }
          }
        });
      }
    });
  };

  return (
    <div className="p-4 m-2 rounded-none shadow-xl border border-blue-400 bg-blue-100 flex flex-col gap-2">
      <p className="text-xl font-medium">{title}</p>
      <p className="text-sm">{description}</p>
      <p><span className="text-lg font-bold">Deadline:</span> {deadline} {deadline_time}</p>
      <div className="flex items-center justify-center gap-8">
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-sm btn-outline rounded-none font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl bg-red-500 hover:bg-red-400 text-white"
        >
          <FaTrash />
        </button>
        <button
          onClick={() => handleOngoing(_id)}
          disabled={status === "ongoing"}
          className="btn btn-sm btn-outline rounded-none font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl bg-yellow-500 hover:bg-yellow-400 text-white"
        >
          <FaArrowRight />
        </button>
        <button
          onClick={() => handleComplete(_id)}
          disabled={status === "completed"}
          className="btn btn-sm btn-outline rounded-none font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl bg-green-500 hover:bg-green-400 text-white"
        >
          <FaCheck />
        </button>
      </div>
    </div>
  );
};

export default TodosCard;
