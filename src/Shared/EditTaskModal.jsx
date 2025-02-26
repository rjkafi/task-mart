import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

const EditTaskModal = ({ task, isOpen, onClose, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const updateTask = useMutation({
    mutationFn: async (updatedTask) => {
      const response = await axiosPublic.put(`/tasks/${task._id}`, updatedTask);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Task updated successfully!");
      refetch();
      onClose(); // Close modal after updating
    },
    onError: () => {
      toast.error("Error updating task.");
    },
  });

  const handleUpdate = () => {
    if (title.trim().length < 3 || title.trim().length > 50) {
      return toast.error("Title must be between 3 and 50 characters.");
    }
    updateTask.mutate({ title, description });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-lg font-semibold">Edit Task</h2>
        <input
          type="text"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mt-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleUpdate} className="btn-save">Update Task</button>
        <button onClick={onClose} className="btn-cancel">Cancel</button>
      </div>
    </div>
  );
};

export default EditTaskModal;
