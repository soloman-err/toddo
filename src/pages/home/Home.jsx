import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Container from "../../components/container/Container";
import { Link } from "react-router-dom";
import { GripVertical } from "lucide-react";

const Home = () => {
  const initialColumns = {
    todo: [],
    inProgress: [],
    issues: [],
    done: [],
  };

  const [inputValue, setInputValue] = useState("");
  const [columns, setColumns] = useState(initialColumns);

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

  // Aside bar link-lists:
  const links = [
    { text: "Boards", url: "/boards" },
    { text: "Pages", url: "/pages" },
    { text: "Settings", url: "/settings" },
  ];

  return (
    <div className="min-h-screen">
      <Container>
        <div className="flex min-h-screen">
          {/* Aside bar */}
          <div className="flex flex-col min-w-44 border-r py-2 pr-2 min-h-screen">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className="text-sm font-semibold uppercase p-2 rounded hover:bg-gray-100 transition-colors text-black/70"
              >
                {link.text}
              </Link>
            ))}

            <div className="mt-auto">
              <p className="text-sm font-semibold text-black/50">
                &copy; Toddo {new Date().getFullYear()}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col justify-start w-full h-full">
            {/* Form for adding tasks */}
            <div className="flex justify-start p-4">
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

            {/* Kanban Board */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="flex justify-start w-full h-full mx-auto p-4 gap-2">
                {Object.keys(columns).map((columnId) => (
                  <div key={columnId} className="w-full">
                    <div className="text-center bg-black text-white font-bold p-2 rounded">
                      <div className="flex items-center gap-1">
                        <GripVertical size={16} />
                        <p className="text-sm">{columnId.toUpperCase()}</p>
                      </div>
                    </div>

                    {/* Droppable component */}
                    <Droppable
                      droppableId={columnId}
                      key={columnId}
                      type="group"
                    >
                      {(provided) => (
                        <ul
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="border p-2 rounded w-full mt-2 h-full overflow-y-auto"
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
        </div>
      </Container>
    </div>
  );
};

export default Home;
