import React from "react";
import TaskManager from "./TaskManager";
import TabLimitter from "./TabLimitter";
import LimitWebsite from "./LimitSites";
export default function Content({
  contents,
  canShowApp,
  todoOperation,
  SetTodoOperation,
}) {
  return (
    <>
      {contents[0] === "taskmanager" && (
        <TaskManager
          SetTodoOperation={SetTodoOperation}
          todoOperation={todoOperation}
          canShowApp={canShowApp}
        />
      )}
      {contents[0] === "tablimitter" && <TabLimitter canShowApp={canShowApp} />}
      {contents[0] === "limitwebsite" && (
        <LimitWebsite canShowApp={canShowApp} />
      )}
    </>
  );
}
