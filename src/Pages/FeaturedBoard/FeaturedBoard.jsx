import { FcTodoList } from "react-icons/fc";
import { GiProgression } from "react-icons/gi";
import { MdCloudDone } from "react-icons/md";
import TaskColumn from "../../Shared/TaskColumn";
import Input from "../../Shared/Input";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { DragDropContext } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";


const FeaturedBoard = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

  const { data: tasks = [], refetch } = useQuery({
        queryKey: ["email ", user?.email], 
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, 
    });

    // Drag-and-drop handler for updating task category
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return; 

        const taskId = active.id;
        const newCategory = over.id;

        // Update state instantly for a smooth UI experience
        const updatedTasks = tasks.map((task) =>
            task._id === taskId ? { ...task, category: newCategory } : task
        );
        setTasks(updatedTasks); 

        // Send update request to the backend
        axiosPublic.put(`/tasks/${taskId}`, { category: newCategory })
         .then(() => refetch())
            .catch((err) => console.error("Error updating task:", err));
    };

    return (
        <div className="container mx-auto md:py-12 p-2">
            <div className="md:w-2/6 mx-auto mb-12">
                <Input refetch={refetch} />
            </div>

            {/* Drag and Drop Context */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="md:flex md:columns-3  md:gap-3 px-3">
                    <TaskColumn
                        id="TODO"
                        categorize="TODO"
                        icon={<FcTodoList />}
                        refetch={refetch}
                        tasks={tasks.filter((task) => task?.category === "TODO")}
                       
                    />
                    <TaskColumn
                        id="In Progress"
                        categorize="In Progress"
                        icon={<GiProgression className="text-sky-500" />}
                        tasks={tasks.filter((task) => task?.category === "In Progress")}
                    />
                    <TaskColumn
                        id="Done"
                        categorize="Done"
                        icon={<MdCloudDone className="text-green-400" />}
                        tasks={tasks.filter((task) => task?.category === "Done")}
                    />
                </div>
            </DragDropContext>
        </div>
    );
};

export default FeaturedBoard;
