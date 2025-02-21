import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Input = ({ refetch }) => {
    const axiosPublic = useAxiosPublic();

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;

        // Create the Task object
        const newTask = {
            title,
            category: "TODO", 
        };

        axiosPublic.post("/tasks", newTask)
            .then((response) => {
                console.log("Task added successfully:", response.data);
                Swal.fire({
                    title: "Success!",
                    text: "Task has been added in TODO List!",
                    icon: "success",
                    confirmButtonText: "OK",
                })
                refetch();
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: error.response ? error.response.data.message : "There was an error adding Task",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg mb-4">
            <form onSubmit={handleSubmit} className="flex join-item">
                {/* Task Title */}
                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        className="w-full border rounded-lg p-2"
                        placeholder="Add Task"
                        required
                    />
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white btn"
                >
                   Add
                </button>
            </form>
        </div>
    );
};

export default Input;
