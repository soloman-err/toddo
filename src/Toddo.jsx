import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Canban = () => {
  const initialColumns = {
    todo: [],
    inProgress: [],
    done: [],
  };

  const [columns, setColumns] = useState(initialColumns);
  const [inputValue, setInputValue] = useState("");

  // Handle input change:
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle tasks:
  const handleAddTask = (e) => {
    e.preventDefault(); // Prevent form submission
    if (inputValue.trim() !== "") {
      const newTask = { id: Date.now().toString(), content: inputValue };
      setColumns((prevColumns) => ({
        ...prevColumns,
        todo: [...prevColumns.todo, newTask],
      }));
      setInputValue("");
    }
  };

  // Handle drag and drop (reorder or move task):
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; // If dropped outside the list, ignore

    // If dropped within the same list
    if (source.droppableId === destination.droppableId) {
      const column = [...columns[source.droppableId]];
      const newTasks = Array.from(column);
      const [removedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removedTask);

      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: newTasks,
      }));
    } else {
      // If dropped in a different list
      const sourceColumn = [...columns[source.droppableId]];
      const destinationColumn = [...columns[destination.droppableId]];
      const [removedTask] = sourceColumn.splice(source.index, 1);
      removedTask.id = Date.now().toString();
      destinationColumn.splice(destination.index, 0, removedTask);

      setColumns((prevColumns) => ({
        ...prevColumns,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destinationColumn,
      }));
    }
  };

  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      <div className="w-full">
        <div className="flex justify-between w-full max-w-4xl mx-auto shadow-lg p-10 rounded-lg gap-2">
          <div>
            <h2 className="text-4xl uppercase font-bold">
              <span className="rotate-12 inline-block">T</span>
              <span className="rotate-12 inline-block">o</span>
              <span className="rotate-12 inline-block">d</span>
              <span className="rotate-12 inline-block">d</span>
              <span className="rotate-12 inline-block">o</span>
            </h2>
            <h3 className="text text-gray-400">Task Management Board</h3>
          </div>

          {/* Form for adding tasks */}
          <div className="flex justify-between">
            <div></div>
            <div className="mt-auto">
              <form onSubmit={handleAddTask} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Add task"
                  className="bg-black/10 p-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-5 rounded font-bold uppercase"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex justify-between w-full max-w-4xl mx-auto shadow-lg p-10 rounded-lg gap-2">
          {Object.keys(columns).map((columnId) => (
            <div key={columnId} className="w-full">
              <div className="text-center bg-black text-white font-bold p-2 rounded">
                <h2>{columnId.toUpperCase()}</h2>
              </div>

              {/* Droppable component */}
              <Droppable droppableId={columnId} key={columnId} type="group">
                {(provided) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="border p-2 rounded w-full mt-2 h-96 overflow-y-auto"
                  >
                    {columns[columnId].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 rounded mb-2 shadow border"
                          >
                            {task.content}
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Canban;
