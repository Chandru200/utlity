import { useState, useEffect } from "react";
import React from "react";
import { StyledTM } from "./styles/styleTM.style";
import Todo from "./Todo";
import OperationTodo from "./CreateTodo";
import { OpenPopUp } from "../components/Popup/popup";
export default function TaskManager({ canShowApp }) {
  const [openCeateTodo, setCreateTodo] = useState(false);
  useEffect(() => {
    if (openCeateTodo) {
      console.log(openCeateTodo.text, "openCeateTodo");
      OpenPopUp({
        elementID: openCeateTodo.id,
        textcomponent: openCeateTodo.text,
        PopupComponent: () => {
          return <OperationTodo />;
        },
      });
    }
  }, [openCeateTodo]);
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
                openCeateTodo={openCeateTodo}
                setCreateTodo={setCreateTodo}
                key={todo.id}
                todo={todo}
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
