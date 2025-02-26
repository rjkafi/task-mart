

import { FcTodoList } from "react-icons/fc";
import { GiProgression } from "react-icons/gi";
import { MdCloudDone } from "react-icons/md";
import TaskColumn from "../../Shared/TaskColumn";
import Input from "../../Shared/Input";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";


import { DragDropContext } from "@hello-pangea/dnd";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Swal from "sweetalert2";


const FeaturedBoard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [editTask, setEditTask] = useState(null);

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    const updatedData = {
        title: e.target.title.value,
        description: e.target.description.value,
    };

    await axiosPublic.put(`/tasks/${editTask._id}`, updatedData);
    setEditTask(null);
    refetch();
    Swal.fire("Updated!", "Task has been updated successfully!", "success");
};


  const updateTaskCategory = useMutation({
    mutationFn: async (task) => {
      const response = await axiosPublic.put(`/tasks/${task._id}`, {
        category: task.category,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task moved successfully!");
      refetch();
    },
    onError: () => {
      toast.error("Error updating task.");
    },
  });

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; // Dropped outside the list
  
    const taskId = draggableId;
    const newCategory = destination.droppableId;
  
    const updatedTask = tasks.find((task) => task._id === taskId);
    updatedTask.category = newCategory;
  
    // Optimistically update UI and sync with backend
    updateTaskCategory.mutate(updatedTask);
  };
  



    return (
        <div className="container mx-auto md:py-12 p-2">
            <div className="md:w-2/6 mx-auto mb-12">
                <Input refetch={refetch} />
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
      <div className="task-board grid grid-cols-1 md:grid-cols-3">
        <TaskColumn
          id="TODO"
          categorize="To-Do"
          icon={<FcTodoList />}
          tasks={tasks.filter((task) => task.category === "TODO")}
          refetch={refetch}
          setEditTask={setEditTask}
        />
        <TaskColumn
          id="IN_PROGRESS"
          categorize="In Progress"
          icon={<GiProgression />}
          tasks={tasks.filter((task) => task.category === "IN_PROGRESS")}
          refetch={refetch}
          setEditTask={setEditTask}
        />
        <TaskColumn
          id="DONE"
          categorize="Done"
          icon={<MdCloudDone />}
          tasks={tasks.filter((task) => task.category === "DONE")}
          refetch={refetch}
          setEditTask={setEditTask}
        />
      </div>
    </DragDropContext>
    {/* modal for edit task */}
    {editTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold">Edit Task</h2>
                        <form onSubmit={handleUpdateTask}>
                            <label className="block mt-2">Title</label>
                            <input type="text" name="title" defaultValue={editTask.title} required 
                                className="border rounded p-2 w-full"/>

                            <label className="block mt-2">Description</label>
                            <textarea name="description" defaultValue={editTask.description} 
                                className="border rounded p-2 w-full"></textarea>

                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" onClick={() => setEditTask(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Update Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default FeaturedBoard;



// import { FcTodoList } from "react-icons/fc";
// import { GiProgression } from "react-icons/gi";
// import { MdCloudDone } from "react-icons/md";
// import TaskColumn from "../../Shared/TaskColumn";
// import Input from "../../Shared/Input";
// import useAuth from "../../hooks/useAuth";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import { DragDropContext } from "@hello-pangea/dnd";

// const FeaturedBoard = () => {
//   const { user } = useAuth();
//   const axiosPublic = useAxiosPublic();

//   const { data: tasks = [], refetch } = useQuery({
//     queryKey: ["tasks", user?.email],
//     queryFn: async () => {
//       const res = await axiosPublic.get(`/tasks?email=${user.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   const handleDragEnd = async (result) => {
//     const { source, destination, draggableId } = result;
//     if (!destination) return;

//     const taskId = draggableId;
//     const newCategory = destination.droppableId;

//     const updatedTask = tasks.find((task) => task._id === taskId);
//     updatedTask.category = newCategory;

//     await axiosPublic.put(`/tasks/${taskId}`, { category: newCategory });
//     refetch();  // Refresh tasks after drag and drop
//   };

//   return (
//     <div className="container mx-auto md:py-12 p-2">
//       <div className="md:w-2/6 mx-auto mb-12">
//         <Input refetch={refetch} />
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="task-board grid grid-cols-1 md:grid-cols-3 gap-4">
//           <TaskColumn
//             id="TODO"
//             categorize="To-Do"
//             icon={<FcTodoList />}
//             tasks={tasks.filter((task) => task.category === "TODO")}
//             refetch={refetch}
//           />
//           <TaskColumn
//             id="IN_PROGRESS"
//             categorize="In Progress"
//             icon={<GiProgression className="text-blue-400" />}
//             tasks={tasks.filter((task) => task.category === "IN_PROGRESS")}
//             refetch={refetch}
//           />
//           <TaskColumn
//             id="DONE"
//             categorize="Done"
//             icon={<MdCloudDone className="text-green-500" />}
//             tasks={tasks.filter((task) => task.category === "DONE")}
//             refetch={refetch}
//           />
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default FeaturedBoard;
