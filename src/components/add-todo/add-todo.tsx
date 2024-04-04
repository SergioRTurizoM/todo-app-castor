import React, { ChangeEvent, KeyboardEvent, useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { AuthContext } from "../../providers/auth";
import Typography from '@mui/material/Typography';

export const AddTodo = () => {
  const [title, setTitle] = useState<any>();
  const [description, setDescription] = useState<any>();
  const { user } = useContext(AuthContext);

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const valueTyped = (event.target as HTMLInputElement).value;

      if (valueTyped) {
        addDoc(collection(db, "todos"), {
          title,
          description,
          isCompleted: false,
          created_at: new Date(),
          userId: user?.uid,
        });
      }
    }
  };

  const setTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const setDescriptionValue = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Card>
     <Typography sx={{ fontSize: 14, mt: 3, ml: 2 }} color="text.secondary" gutterBottom>
          After typing your task, press enter to add it to the list.
        </Typography>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <RadioButtonUncheckedIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
          />
          <TextField
            error={false}
            id="input-with-sx"
            type="text"
            label="Add Title"
            name="title"
            fullWidth
            variant="standard"
            onChange={setTitleValue}
            value={title}
            onKeyPress={onKeyPress}
            sx={{ ml: 1 }}
          />
          <TextField
            id="input-with-sx"
            type="text"
            label="Add Description"
            name="description"
            variant="standard"
            fullWidth
            onChange={setDescriptionValue}
            value={description}
            onKeyPress={onKeyPress}
            sx={{ ml: 2 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
