import { Droppable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";

const TaskColumn = ({ id, categorize, icon, tasks,refetch }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
                    {icon} {categorize}
                </h2>

                <Droppable droppableId={id}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="drop-zone"
                            style={{
                                minHeight: 200,
                                background: snapshot.isDraggingOver ? "#f3f4f6" : "transparent",
                            }}
                        >
                            {tasks.map((task, index) => (
                                <TaskItem key={task._id} task={task} index={index} refetch={refetch} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
};

export default TaskColumn;
