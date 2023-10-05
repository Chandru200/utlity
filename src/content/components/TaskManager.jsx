import { useState } from "react";
import React from "react";
import { StyledTM } from "./styles/styleTM.style";
import Todo from "./Todo";
export default function TaskManager({ canShowApp }) {
  console.log(canShowApp, "canShowApp");

  return (
    <StyledTM>
      <div className="tabname">Task Manager Tab</div>
      <div className="all_tasks">
        <div className="tab-header">{`No of tasks-${
          canShowApp?.todos_list?.length ? canShowApp.todos_list.length : 0
        }`}</div>
        {canShowApp?.todos_list?.length > 0 ? (
          canShowApp.todos_list.map((todo) => {
            return <Todo key={todo.id} todo={todo} />;
          })
        ) : (
          <div className="empty_state">Crete New Tasks</div>
        )}
      </div>
    </StyledTM>
  );
}
