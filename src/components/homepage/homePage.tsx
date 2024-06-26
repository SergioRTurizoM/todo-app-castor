import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { db } from "../../configs/firebase";
import {
  collection,
  onSnapshot,
  doc,
  query,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../../providers/auth";
import { AddTodo } from "../add-todo";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import { Todo } from "../../models/todo";
import { Box, Grid, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

type HomePageButtonProps = {
  isactive?: 'true' | 'false';
  children: ReactNode;
  onClick?: () => void;
};
const HomePageButton: FC<HomePageButtonProps> = (props) => {
  const { isactive = false } = props;
  return (
    <Button
      sx={{ color: isactive ? "info.light" : "text.secondary" }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

enum FilterState {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

export const HomePage = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterState>(
    FilterState.ALL
  );
  const { user } = useContext(AuthContext);

  const q = query(collection(db, "todos"), where("userId", "==", user?.uid));

  useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      const todos: Todo[] = [];
      querySnapshot.forEach((doc) => {
        const todoItem = {
          id: doc.id,
          ...doc.data(),
        };
        todos.push(todoItem as Todo);
      });
      setTodos(todos);
    });

    return unsub;
  }, []);

  const handleRadioChecking = (todo: Todo) => {
    if (todo.id) {
      const docReference = doc(db, "todos", todo.id);
      updateDoc(docReference, {
        isCompleted: true,
      });
    }
  };

  const deleteTodo = (todo: Todo) => {
    if (todo.id) {
      deleteDoc(doc(db, "todos", todo.id));
    }
  };
  const totalActiveTasks = todos?.filter((todo) => !todo.isCompleted) ?? [];
  const completedTodos = todos?.filter((todo) => todo.isCompleted) ?? [];

  const filteredTodos =
    activeFilter === FilterState.ALL
      ? todos
      : todos?.filter((todo) => {
          const filterFiltering =
            activeFilter === FilterState.ACTIVE ? false : true;

          return todo.isCompleted === filterFiltering;
        });

  const clearCompleted = () => {
    completedTodos.forEach(deleteTodo);
  };

  const formatTimestamp = (timestamp: any) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  };

  const todoItems = filteredTodos?.map((todo: Todo) => (
    <ListItem
      sx={{ padding: 0, m: 0, borderBottom: "1px dashed gray" }}
      key={todo.id}
    >
      <ListItemButton>
        {todo.isCompleted ? (
          <TaskAltIcon sx={{ mr: 1, ml: 1 }} />
        ) : (
          <Radio
            checked={todo.isCompleted}
            onChange={() => handleRadioChecking(todo)}
            inputProps={{ "aria-label": todo.title }}
          ></Radio>
        )}

        <ListItemText>
          <Grid
            sx={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            {todo.title}
          </Grid>
        </ListItemText>
        <ListItemText sx={{ textAlign: "left" }}>
          <Grid
            sx={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
              textAlign: "left",
              justifyContent: "space-between",
            }}
          >
            {todo.description}
          </Grid>
        </ListItemText>
        <ListItemText sx={{ textAlign: "left" }}>
          <Grid
            sx={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
              textAlign: "left",
              justifyContent: "space-between",
            }}
          >
            {formatTimestamp(todo.created_at)}
          </Grid>
        </ListItemText>

        <Grid>
          <IconButton onClick={() => deleteTodo(todo)}>
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </ListItemButton>
    </ListItem>
  ));

  return (
    <div>
      <AddTodo />
      <Card sx={{ mt: 2 }}>
        <CardContent sx={{ padding: 0 }}>
          <List>{todoItems}</List>
        </CardContent>
        <CardActions>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box component={"span"}>{totalActiveTasks?.length} pending tasks</Box>
            <Box sx={{ display: "flex" }}>
              <HomePageButton
                isactive={activeFilter === FilterState.ALL ? 'true' : 'false'}
                onClick={() => setActiveFilter(FilterState.ALL)}
              >
                All
              </HomePageButton>
              <HomePageButton
                isactive={activeFilter === FilterState.ACTIVE ? 'true' : 'false'}
                onClick={() => setActiveFilter(FilterState.ACTIVE)}
              >
                Pending
              </HomePageButton>
              <HomePageButton
                isactive={activeFilter === FilterState.COMPLETED ? 'true' : 'false'}
                onClick={() => setActiveFilter(FilterState.COMPLETED)}
              >
                Completed{" "}
              </HomePageButton>
            </Box>
            <Box>
              <HomePageButton onClick={clearCompleted}>
                {" "}
                Clear Completed
              </HomePageButton>
            </Box>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};
