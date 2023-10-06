import React, { useState } from "react";
export default function Todo({ todo, setCreateTodo }) {
  const [showDes, setSetShow] = useState(false);

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

  const openEdit = () => {
    setCreateTodo({
      id: "task-manager",
      text: { yes: "Create", no: "Cancel" },
    });
  };
  const openDelete = () => {};
  const openNotify = () => {};

  return (
    <div className="task-wrapper">
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
          <div onClick={openEdit} className="edit">
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
