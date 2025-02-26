

import { Draggable } from "@hello-pangea/dnd";
import Swal from "sweetalert2";
import { MdDelete, MdEdit } from "react-icons/md";
import useAxiosPublic from "../hooks/useAxiosPublic";

import { useState } from "react";
import EditTaskModal from "./EditTaskModal";



const TaskItem = ({ task, index, refetch }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const axiosPublic = useAxiosPublic();
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosPublic.delete(`/tasks/${id}`);
                refetch();
                Swal.fire("Deleted!", "Task has been deleted.", "success");
            }
        });
    };



    return (
        <>
            <Draggable draggableId={task._id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="task-item flex justify-between items-center p-2 shadow-lg rounded bg-white"
                    >
                        <div>
                            <h3 className="font-bold">{task.title}</h3>
                            <p className="text-sm">{task.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setIsEditOpen(true)} className="btn-edit">✏️</button>
                            <button onClick={() => handleDelete(task._id)} className="text-red-500">
                                <MdDelete size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </Draggable>
            <EditTaskModal
                task={task}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                refetch={refetch}
            />
        </>

    );
};

export default TaskItem;



// import { useState } from "react";
// import Swal from "sweetalert2";
// import { Draggable } from "@hello-pangea/dnd";
// import { MdDelete, MdEdit } from "react-icons/md";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import toast from "react-hot-toast";


// const TaskItem = ({ task, index, refetch }) => {
//   const axiosPublic = useAxiosPublic();
//   const [tasks, setTasks] = useState([]);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [updatedTask, setUpdatedTask] = useState({});

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//       reverseButtons: true,
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosPublic.delete(`/tasks/${id}`);
//         refetch();
//         Swal.fire("Deleted!", "Task has been deleted.", "success");
//       } catch (error) {
//         Swal.fire("Error!", "There was an issue deleting your Task.", "error");
//       }
//     }
//   };
//   const handleUpdateClick = (task) => {
//     setSelectedTask(task);
//     setUpdatedTask({
//       title: task.title,
//       description: task.description,
//     });
//     setShowUpdateModal(true);
//   };

// const handleUpdateSubmit = (e) => {
//     e.preventDefault();
//     axiosPublic
//       .put(`/tasks/${selectedTask._id}`, updatedTask)
//       .then((response) => {
//         setTasks(
//           tasks.map((m) =>
//             m._id === selectedTask._id ? { ...m, ...updatedTask } : m
//           )
//         );
//         setShowUpdateModal(false);
//         toast.success("Task updated successfully!");
//       })
//       .catch((error) => {
//         console.error("Error updating Task:", error);
//         toast.error("Failed to update Task.");
//       });
//   };

//   return (
//     <>
//       <Draggable draggableId={task._id} index={index}>
//         {(provided, snapshot) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             className={`bg-white p-3 rounded-lg shadow-md mb-2 cursor-pointer ${snapshot.isDragging ? "opacity-50" : ""}`}
//           >
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//             <button  onClick={() => handleUpdateClick(task)}
//                   className="text-blue-500 hover:underline mx-2">
//               <MdEdit  />
//             </button>
//             <button onClick={() => handleDelete(task._id)}>
//               <MdDelete className="text-lg text-red-500" />
//             </button>
//           </div>
//         )}
//       </Draggable>

//       {showUpdateModal && (
//         <div className="modal modal-open">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg">Update Task</h3>
//             <form onSubmit={handleUpdateSubmit}>
//               <div className="form-control mb-4">
//                 <label className="label">Title</label>
//                 <input
//                   type="text"
//                   className="input input-bordered"
//                   value={updatedTask.title}
//                   onChange={(e) =>
//                     setUpdatedTask({ ...updatedTask, title: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="form-control mb-4">
//                 <label className="label">Description</label>
//                 <input
//                   type="text"
//                   className="input input-bordered"
//                   value={updatedTask.description}
//                   onChange={(e) =>
//                     setUpdatedTask({ ...updatedTask, description: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="modal-action">
//                 <button type="button" className="btn" onClick={() => setShowUpdateModal(false)}>
//                   Close
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TaskItem;




