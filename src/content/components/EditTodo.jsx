import React from "react";
import Input from "./Input";
import DateTimePicker from "./dateTimePicker";
import { updateSharedData } from "../redux/manager";

import { useDispatch, useSelector } from "react-redux";

export default function OperationTodo() {
  const todo = useSelector((state) => state.sharedData);
  const dispatch = useDispatch();
  const setTodo = (value) => {
    dispatch(updateSharedData(value));
  };
  return (
    <div>
      <Input
        name="text"
        placeholder="Task Name"
        ChangeParentState={setTodo}
        ParentState={todo}
        value={todo.name ? todo.name : ""}
      />
      <Input
        name="textarea"
        placeholder="About Your Task..."
        ChangeParentState={setTodo}
        ParentState={todo}
        value={todo.description ? todo.description : ""}
      />
      <DateTimePicker
        placeholder="Select Duedate"
        ChangeParentState={setTodo}
        ParentState={todo}
      />
    </div>
  );
}
