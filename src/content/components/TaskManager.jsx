import { useState, useEffect } from "react";
import React from "react";
import { StyledTM } from "./styles/styleTM.style";
import Todo from "./Todo";

//redux and popup imports - need to optimize
import OperationTodo from "./CreateTodo";
import { OpenPopUp, closePopUp } from "../components/Popup/popup";
import { useDispatch, useSelector } from "react-redux";
import { updateSharedData } from "../redux/manager";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function TaskManager({
  canShowApp,
  todoOperation,
  SetTodoOperation,
}) {
  const [checkValidation, setcheckValidation] = useState(false);
  const sharedData = useSelector((state) => state.sharedData);
  const dispatch = useDispatch();
  const createTodo = () => {
    dispatch(updateSharedData({}));
    OpenPopUp({
      elementID: "task-manager",
      textcomponent: { yes: "Create", no: "Cancel" },
      PopupComponent: () => {
        return (
          <Provider store={store}>
            <OperationTodo action={"edit"} />
          </Provider>
        );
      },
      onYes: () => {
        setcheckValidation(true);
      },
    });
  };

  useEffect(() => {
    if (checkValidation) {
      setcheckValidation(false);
      console.log(sharedData.name.trim().length);
      if (sharedData.name && sharedData.name.trim().length > 0) {
        console.log("submitted");
        closePopUp();
      } else {
        console.log("task field is empty");
      }
    }
  }, [checkValidation]);

  return (
    <StyledTM id="task-manager">
      <div className="tabname">Task Manager Tab</div>
      <div className="all_tasks">
        <div className="tab-header">
          <div>{`No of tasks-${
            canShowApp?.todos_list?.length ? canShowApp.todos_list.length : 0
          }`}</div>
          <div onClick={createTodo} className="create">
            +Create
          </div>
        </div>
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
