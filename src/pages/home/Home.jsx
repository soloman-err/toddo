import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { GripVertical } from "lucide-react";
import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  TextField,
  Container,
  IconButton,
  Menu,
  Drawer,
} from "@mui/material";

const Home = () => {
  const initialColumns = {
    todo: [],
    inProgress: [],
    issues: [],
    done: [],
  };

  const [inputValue, setInputValue] = useState("");
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem("columns");
    return savedColumns ? JSON.parse(savedColumns) : initialColumns;
  });

  // Handle input change:
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle tasks:
  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now().toString(),
        content: inputValue,
        createdAt: new Date().toISOString(),
      };
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

  // Save columns to local storage:
  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  // Aside bar link-lists:
  const links = [
    { text: "Boards", url: "/boards" },
    { text: "Pages", url: "/pages" },
    { text: "Settings", url: "/settings" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="2xl">
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          {/* Sidebar toggle button */}
          <IconButton onClick={toggleSidebar} sx={{ zIndex: 1 }}>
            <Menu />
          </IconButton>

          {/* Aside bar */}
          <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRight: 1,
                py: 2,
                pr: 2,
                gap: 1,
              }}
            >
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  sx={{
                    textDecoration: "none",
                    p: 2,
                    "&:hover": { bgcolor: "grey.300" },
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    "&:active": {
                      bgcolor: "grey.400",
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}

              <Box sx={{ mt: "auto" }}>
                <Typography variant="body2" color="text.secondary">
                  &copy; Toddo {new Date().getFullYear()}
                </Typography>
              </Box>
            </Box>{" "}
          </Drawer>

          {/* Main Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              width: "100%",
              height: "100%",
            }}
          >
            {/* Form for adding tasks */}
            <Box sx={{ display: "flex", justifyContent: "start", p: 4 }}>
              <Box sx={{ mt: "auto" }}>
                <form onSubmit={handleAddTask}>
                  <TextField
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Add task"
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                  >
                    Add
                  </Button>
                </form>
              </Box>
            </Box>

            {/* Kanban Board */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  width: "100%",
                  height: "100%",
                  p: 4,
                  gap: 2,
                }}
              >
                {Object.keys(columns).map((columnId) => (
                  <Box key={columnId} sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        bgcolor: "black",
                        color: "white",
                        fontWeight: "bold",
                        p: 2,
                        borderRadius: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <GripVertical size={16} />
                        <Typography variant="body2">
                          {columnId?.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Droppable component */}
                    <Droppable
                      droppableId={columnId}
                      key={columnId}
                      type="group"
                    >
                      {(provided) => (
                        <List
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          sx={{
                            border: 1,
                            p: 2,
                            borderRadius: 1,
                            width: "100%",
                            mt: 2,
                            height: "100%",
                            overflowY: "auto",
                          }}
                        >
                          {columns[columnId].map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided) => (
                                <ListItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sx={{
                                    bgcolor: "white",
                                    p: 2,
                                    borderRadius: 1,
                                    mb: 2,
                                    boxShadow: 1,
                                    border: 1,
                                  }}
                                >
                                  <Box>
                                    <Typography
                                      variant="body1"
                                      fontWeight="bold"
                                    >
                                      {task.content}
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        {new Date(
                                          task.createdAt
                                        ).toLocaleString()}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </ListItem>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </List>
                      )}
                    </Droppable>
                  </Box>
                ))}
              </Box>
            </DragDropContext>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
