import React from "react";
import Input from "./Input";
export default function OperationTodo({ SetTodo, todo }) {
  return (
    <div>
      <Input
        name="text"
        label="Task"
        placeholder="Task Name"
        required={true}
        ChangeParentState={SetTodo}
        ParentState={todo}
        value={todo.name ? todo.name : ""}
      />
      <Input
        name="textarea"
        label="Password"
        placeholder="About Your Task..."
        ChangeParentState={SetTodo}
        ParentState={todo}
        value={todo.description ? todo.description : ""}
      />
    </div>
  );
}
