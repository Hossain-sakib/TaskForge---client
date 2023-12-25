// TodosCard.jsx
import { FaArrowRight, FaCheck, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const TodosCard = ({ todo }) => {
    const { title, deadline, description, deadline_time, _id, status } = todo;
    const axiosPublic = useAxiosPublic();

    const handleDelete = (id) => {
        confirmAction(id, "delete", "Task has been deleted.");
    };

    const handleOngoing = (id) => {
        confirmAction(id, "ongoing", "Task has been marked as ongoing!");
    };

    const handleComplete = (id) => {
        confirmAction(id, "completed", "Task has been added to completed list!");
    };

    const confirmAction = (id, status, successMessage) => {
        const actionText = getStatusText(status);

        Swal.fire({
            title: `Have you ${actionText} your task?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${actionText} it!`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/todos/${id}`, { status })
                    .then(response => {
                        if (response.data.success) {
                            Swal.fire({
                                title: "Success!",
                                text: successMessage,
                                icon: "success"
                            });
                        } else {
                            showError();
                        }
                    })
                    .catch(showError);
            }
        });
    };

    const showError = (error) => {
        console.error("Error:", error);
        Swal.fire({
            title: "Error",
            text: "An error occurred. Please try again.",
            icon: "error"
        });
    };

    const getStatusText = (status) => {
        switch (status) {
            case "delete":
                return "deleted";
            case "ongoing":
                return "marked as ongoing";
            case "completed":
                return "marked as completed";
            default:
                return "";
        }
    };

    return (
        <div>
            <div className="p-4 m-2 rounded-md shadow-xl bg-blue-300 flex flex-col gap-2">
                <p className="text-xl font-medium">{title}</p>
                <p className="text-sm">{description}</p>
                <p>{deadline} {deadline_time}</p>
                <div className={`${status === "completed" ? "hidden" : "flex items-center justify-center gap-8"}`}>
                    <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-error">
                        <FaTrash />
                    </button>
                    <button onClick={() => handleOngoing(_id)} className="btn btn-circle btn-neutral">
                        <FaArrowRight />
                    </button>
                    <button onClick={() => handleComplete(_id)} className="btn btn-circle btn-success">
                        <FaCheck />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodosCard;
