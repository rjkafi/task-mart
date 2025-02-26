import { Droppable } from "@hello-pangea/dnd";
import TaskItem from "../Shared/TaskItem";


const TaskColumn = ({ id, categorize, icon, tasks, refetch ,setEditTask}) => {
  return (
    <div className="task-column">
      <h2>{icon} {categorize}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list"
          >
            {tasks.map((task, index) => (
              <TaskItem key={task._id} task={task} index={index} refetch={refetch} setEditTask={setEditTask} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;