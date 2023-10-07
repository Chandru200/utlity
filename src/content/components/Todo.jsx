import React, { useState, useEffect } from "react";
import OperationTodo from "./CreateTodo";
import { OpenPopUp } from "../components/Popup/popup";
import Input from "./Input";
export default function Todo({ todo }) {
  const [showDes, setSetShow] = useState(false);
  const [editTodo, SetTodo] = useState({ ...todo });
  const handleshowDes = (e, id) => {
    setSetShow(!showDes);
    setTimeout(() => {
      document.getElementById(`taskdes${id}`).scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    });
  };

  function getname() {
    return editTodo.name;
  }

  const openEdit = () => {
    OpenPopUp({
      elementID: "task-manager",
      textcomponent: { yes: "Edit", no: "Cancel" },
      PopupComponent: () => {
        return (
          <OperationTodo action={"edit"} todo={editTodo} SetTodo={SetTodo} />
        );
      },
      onYes: () => {
        console.log(getname(), "editTodo");
        // console.log(todoOperation, "todoOperation");
        // todoOperation.name.trim() && close();
      },
    });
  };
  const openDelete = () => {};
  const openNotify = () => {};
  useEffect(() => {
    console.log(editTodo);
  }, [editTodo]);
  return (
    <div className="task-wrapper">
      {/* <Input
        name="text"
        label=""
        placeholder="About Your Task..."
        ChangeParentState={SetTodo}
        ParentState={editTodo}
        value={editTodo.name ? editTodo.name : ""}
      /> */}

      <div
        onClick={(e) => handleshowDes(e, todo.id)}
        className="task-preview-wrapper"
      >
        <div className="todo-wrapper">
          <div className="name">{todo.name}</div>
          <div className="duedate">
            <div>Duedate:</div>
            <div>{todo.duedate}</div>
          </div>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="options">
          <div onClick={(e) => openEdit(todo)} className="edit">
            <img src={chrome.runtime.getURL("assests/images/edit.png")}></img>
          </div>
          <div onClick={openDelete} className="edit">
            <img src={chrome.runtime.getURL("assests/images/trash.png")}></img>
          </div>
          <div onClick={openNotify} className="edit">
            <img
              src={chrome.runtime.getURL("assests/images/notifyme.png")}
            ></img>
          </div>
        </div>
      </div>
      {showDes && (
        <div id={`taskdes${todo.id}`} className="description">
          {todo.description}
        </div>
      )}
    </div>
  );
}
