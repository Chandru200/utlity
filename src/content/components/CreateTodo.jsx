import React from "react";
import Input from "./Input";
import { updateSharedData } from "../redux/manager";
import DateTimePicker from "./dateTimePicker";
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
      />
      <Input
        name="textarea"
        label="Password"
        placeholder="About Your Task..."
        ChangeParentState={setTodo}
        ParentState={todo}
      />
      <DateTimePicker
        placeholder="Select Duedate"
        ChangeParentState={setTodo}
        ParentState={todo}
      />
    </div>
  );
}
