import React from "react";
import Input from "./Input";
export default function OperationTodo() {
  return (
    <div>
      <Input
        name="email"
        label="Task"
        placeholder="Task Name"
        required={true}
        ChangeParentState={"setLoginDetails"}
        loginDetails={"loginDetails"}
      />
      <Input
        name="textarea"
        label="Password"
        placeholder="About Your Task..."
        required={true}
        ChangeParentState={"setLoginDetails"}
        loginDetails={"loginDetails"}
      />
    </div>
  );
}
