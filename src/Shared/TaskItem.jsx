import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const TaskItem = ({ task }) => {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [selectedTask, setSelectedTask] = useState(null);

    const deleteMutation = useMutation({
        mutationFn: async (taskId) => {
            await axiosPublic.delete(`/tasks/${taskId}`);
        },
        onMutate: async (taskId) => {
            await queryClient.cancelQueries(["tasks"]);
            const previousTasks = queryClient.getQueryData(["tasks"]);
            queryClient.setQueryData(["tasks"], (oldTasks) =>
                oldTasks ? oldTasks.filter((t) => t._id !== taskId) : []
            );
            return { previousTasks };
        },
        onError: (err, taskId, context) => {
            queryClient.setQueryData(["tasks"], context.previousTasks); 
        },
        onSettled: () => {
            queryClient.invalidateQueries(["tasks"]);
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (updatedTask) => {
            const { _id, title, category } = updatedTask;
            await axiosPublic.put(`/tasks/${_id}`, { ...updatedTask, title, category });
        },
        onMutate: async (updatedTask) => {
            await queryClient.cancelQueries(["tasks"]);
            const previousTasks = queryClient.getQueryData(["tasks"]);
            queryClient.setQueryData(
                ["tasks"],
                (oldTasks) =>
                    oldTasks
                        ? oldTasks.map((task) =>
                            task._id === updatedTask._id
                                ? { ...task, title: updatedTask.title, category: updatedTask.category }
                                : task
                        )
                        : []
            );
            return { previousTasks };
        },
        onError: (err, updatedTask, context) => {
            queryClient.setQueryData(["tasks"], context.previousTasks); 
        },
        onSettled: () => {
            queryClient.invalidateQueries(["tasks"]);
        },
    });

    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(task._id);
                Swal.fire("Deleted!", "Task has been deleted.", "success");
            }
        });
    };

    const handleEdit = () => {
        setSelectedTask(task);
        setNewTitle(task.title);
        setIsEditing(true);
    };

    const handleSave = () => {
        if (newTitle.trim().length === 0) {
            Swal.fire("Error", "Title cannot be empty", "error");
            return;
        }

        if (newTitle.length > 50) {
            Swal.fire("Error", "Title exceeds the maximum length", "error");
            return;
        }

        if (newTitle !== selectedTask.title) {
            updateMutation.mutate({
                _id: selectedTask._id,
                title: newTitle,
                category: selectedTask.category,
            });
        }
        setIsEditing(false);
        setSelectedTask(null);
    };

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id,
    });

    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined;

    return (
        <>
            <article draggable>
                <div
                    ref={setNodeRef}
                    {...listeners}
                    {...attributes}
                    style={style}
                    className="bg-white p-3 rounded-lg shadow-md mb-2 cursor-pointer"
                >
                    <div className="md:flex justify-between items-center">
                        <h3 className="font-medium">{task.title}</h3>

                        <div className="flex gap-2">
                            <button
                                onClick={handleDelete}
                                className="text-red-500 hover:text-red-700 text-xl"
                            >
                                <MdDelete />
                            </button>
                            <button
                                onClick={handleEdit}
                                className="text-blue-500 hover:text-blue-700 text-xl"
                            >
                                <FaEdit />
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Custom Modal for Editing Task */}
            {isEditing && (
                <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
                    <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-lg text-black">
                        <button onClick={() => setIsEditing(false)} className="absolute top-2 right-2 text-3xl">
                            &times;
                        </button>

                        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>

                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="p-2 border rounded mb-4 w-full"
                        />

                        <div className="flex justify-end gap-4">
                            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
                                Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default TaskItem;
