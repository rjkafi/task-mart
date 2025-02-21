import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { FcTodoList } from "react-icons/fc";
import { GiProgression } from "react-icons/gi";
import { MdCloudDone } from "react-icons/md";
import io from "socket.io-client";
import TaskColumn from "../../Shared/TaskColumn";
import Input from "../../Shared/Input";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const socket = io("https://task-manager-server-liard.vercel.app");

const FeaturedBoard = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch tasks with react-query
    const { data: tasks = [], refetch } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await axiosPublic.get("/tasks");
            return res.data;
        },
    });

    useEffect(() => {
        // Listen for task updates in real-time
        socket.on("taskUpdated", () => {
            refetch();
        });

        return () => {
            socket.off("taskUpdated");
        };
    }, [refetch]);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        // Ensure that both 'active' and 'over' are valid
        if (active.id !== over?.id && over) {
            const updatedTask = tasks.find((task) => task._id === active.id);
            if (updatedTask) {
                updatedTask.category = over.data.current.category; 
                axiosPublic.put(`/tasks/${updatedTask._id}`, updatedTask);
            }
        }
    };

    return (
        <div className="container mx-auto md:py-12 p-2">
            <div className="md:w-2/6 mx-auto mb-12">
                <Input refetch={refetch} />
            </div>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <div className="md:flex md:columns-3 gap-3">
                    <TaskColumn categorize="TODO" icon={<FcTodoList />} tasks={tasks.filter((task) => task.category === "TODO")} />
                    <TaskColumn categorize="In Progress" icon={<GiProgression className="text-sky-500" />} tasks={tasks.filter((task) => task.category === "In Progress")} />
                    <TaskColumn categorize="Done" icon={<MdCloudDone className="text-green-400" />} tasks={tasks.filter((task) => task.category === "Done")} />
                </div>
            </DndContext>
        </div>
    );
};

export default FeaturedBoard;
