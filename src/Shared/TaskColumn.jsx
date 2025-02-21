import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";

const TaskColumn = ({ categorize, icon, tasks }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex-1">
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
                {icon} {categorize}
            </h2>
            <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <TaskItem key={task._id} task={task} />
                ))}
            </SortableContext>
        </div>
    );
};

export default TaskColumn;
