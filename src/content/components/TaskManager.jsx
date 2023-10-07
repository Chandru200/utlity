import { useState, useEffect } from "react";
import React from "react";
import { StyledTM } from "./styles/styleTM.style";
import Todo from "./Todo";
export default function TaskManager({
  canShowApp,
  todoOperation,
  SetTodoOperation,
}) {
  return (
    <StyledTM id="task-manager">
      <div className="tabname">Task Manager Tab</div>
      <div className="all_tasks">
        <div className="tab-header">{`No of tasks-${
          canShowApp?.todos_list?.length ? canShowApp.todos_list.length : 0
        }`}</div>
        {canShowApp?.todos_list?.length > 0 ? (
          canShowApp.todos_list.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                todoOperation={todoOperation}
                SetTodoOperation={SetTodoOperation}
              />
            );
          })
        ) : (
          <div className="empty_state">Crete New Tasks</div>
        )}
      </div>
    </StyledTM>
  );
}
