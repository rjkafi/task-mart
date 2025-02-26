import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Input = ({ refetch }) => {
    const {user}=useAuth()
    const axiosPublic = useAxiosPublic();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

     // Create Task Object
     const newTask = {
        title,
        description,
        timestamp: new Date().toISOString(), 
        category: "TODO",
        email: user.email
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newTask)

        // Validation for Title
        if (title.length < 3) {
            return toast.error("Task  title must be at least 3 characters.");
        }
        if (title.length > 50) {
            return toast.error("Task title must not exceed 50 characters.");
        }

        // Validation for Description
        if (description.length > 200) {
            return toast.error("Task description must not exceed 200 characters.");
        }

      

        try {
            const response = await axiosPublic.post("/tasks", newTask);
            refetch();
            console.log("Task added successfully:", response.data);
            Swal.fire({
                title: "Success!",
                text: "Task has been added to the TODO list!",
                icon: "success",
                confirmButtonText: "OK",
            });

            // Reset form
            setTitle("");
            setDescription("");
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response ? error.response.data.message : "There was an error adding the task",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg mb-4 bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Task Title */}
                <div>
                    <label className="block text-gray-700 font-semibold">Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="title"
                        className="w-full border rounded-lg p-2 mt-1"
                        placeholder="Enter task title..."
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Task Description */}
                <div>
                    <label className="block text-gray-700 font-semibold">Description</label>
                    <textarea
                        name="description"
                        className="w-full border rounded-lg p-2 mt-1"
                        placeholder="Enter task description (optional)..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={200}
                    ></textarea>
                    <small className="text-gray-500">{description.length}/200 characters</small>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default Input;
