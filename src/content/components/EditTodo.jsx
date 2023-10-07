import React from "react";
import Input from "./Input";
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
        label="Task"
        placeholder="Task Name"
        required={true}
        ChangeParentState={setTodo}
        ParentState={todo}
        value={todo.name ? todo.name : ""}
      />
      <Input
        name="textarea"
        label="Password"
        placeholder="About Your Task..."
        ChangeParentState={setTodo}
        ParentState={todo}
        value={todo.description ? todo.description : ""}
      />
    </div>
  );
}
