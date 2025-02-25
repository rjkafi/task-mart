import { Draggable } from "@hello-pangea/dnd";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const TaskItem = ({ task, index ,refetch}) => {
    const axiosPublic=useAxiosPublic();
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Task!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosPublic.delete(`/tasks/${id}`);
                     refetch();
                    Swal.fire("Deleted!", "Task has been deleted.", "success");
                } catch (error) {
                    console.error('Error deleting Task:', error);
                    Swal.fire("Error!", "There was an issue deleting your Task.", "error");
                }
            }
        });
    };

    const handleEdit = (id) => {
        setIsEditing(true);
    };




    return (
        <>
          <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-white p-3 rounded-lg shadow-md mb-2 cursor-pointer ${
                        snapshot.isDragging ? "opacity-50" : ""
                    }`}
                >
                    <div className="md:flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-gray-600 text-sm">{task.description}</p>
                           <div className="flex justify-between gap-2.5 my-2">
                             <p className="text-gray-400 text-xs">
                                Created:{" "}
                                {new Date(task.timestamp).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                            <div className="flex gap-x-2">
                                <button onClick={()=>handleDelete(task._id)} className=" text-red-500 text-lg"> <MdDelete></MdDelete></button>
                                <button onClick={()=>handleEdit(task._id)} className=" text-blue-500 text-lg"><MdEdit /></button>
                            </div>
                           </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
           {/* Custom Modal for Editing Task */}
           {isEditing && (
                <div className="fixed inset-0 z-50 bg-white bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
                    <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-lg text-black">
                        <button onClick={() => setIsEditing(false)} className="absolute top-2 right-2 text-3xl">
                            &times;
                        </button>

                        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>

                         {/* Task Title */}
                <div>
                    <label className="block text-gray-700 font-semibold">Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        className="w-full border rounded-lg p-2 mt-1"
                    />
                </div>

                {/* Task Description */}
                <div>
                    <label className="block text-gray-700 font-semibold">Description</label>
                    <textarea
                        className="w-full border rounded-lg p-2 mt-1"  
                    ></textarea>
                   
                </div>

                        <div className="flex justify-end gap-4">
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
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
