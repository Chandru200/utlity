import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Signin";
import { StyledUtility } from "./styles/styledUtility.style";
import { notifyBackgroundPage } from "../message";
import { closePopUp } from "../components/Popup/popup";

export function App() {
  const [showUtility, setShowUtility] = useState(false);
  const [contents, setContents] = useState([
    "taskmanager",
    "tablimitter",
    "limitwebsite",
  ]);
  const [canShowApp, setCanShow] = useState(false);
  const [checkingStatus, setCheckingstatus] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [signin, setSignIn] = useState(true);
  const [message, setMessage] = useState({});
  const [todoOperation, SetTodoOperation] = useState({});
  const sharedData = useSelector((state) => state.sharedData);

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    setMessage({
      request: request,
      sender: sender,
      sendResponse: sendResponse,
    });
  });

  useEffect(() => {
    console.log(message);
    if (message) {
      let message_name = message.request?.message;
      let data = message.request?.data;
      switch (message_name) {
        case "canShowApp":
          setCanShow(data);
          setCheckingstatus(false);
          break;
        case "login_error":
          setLoginError(message_name);
          break;
        case "showsign":
          setSignIn(true);
          break;
        case "todo_created":
          addTodo();
        case "todo_edited":
          editTodo();
        case "todo_deleted":
          deleteTodo(data.id);
      }
    }
  }, [message]);

  const addTodo = () => {
    setCanShow({ todos_list: [...canShowApp.todos_list, sharedData] });
    closePopUp();
  };

  const editTodo = () => {
    let old_todos = [...canShowApp.todos_list];
    let new_todoos = old_todos.map((todo) => {
      return todo.id === sharedData.id ? sharedData : todo;
    });
    setCanShow({ todos_list: new_todoos });
    closePopUp();
  };

  const deleteTodo = (id) => {
    let old_todos = [...canShowApp.todos_list];
    let new_todoos = old_todos.map((todo) => {
      return todo.id !== id && todo;
    });
    setCanShow({ todos_list: new_todoos });
    closePopUp();
  };

  return (
    <StyledUtility>
      {showUtility &&
        (canShowApp ? (
          <div className="UtilityWraper">
            <Header />
            <Content
              canShowApp={canShowApp}
              contents={contents}
              setContents={setContents}
              todoOperation={todoOperation}
              SetTodoOperation={SetTodoOperation}
            />
            <Footer contents={contents} setContents={setContents} />
          </div>
        ) : checkingStatus ? (
          <div className="UtilityWraper">
            {" "}
            <span>Verifying Authenticity</span>
          </div>
        ) : (
          <Login
            signin={signin}
            setSignIn={setSignIn}
            loginError={loginError}
          />
        ))}
      <div
        onClick={() => {
          setShowUtility(!showUtility);
          notifyBackgroundPage("canShowApp");
        }}
        className={`openAppImgWrapper ${showUtility && "showleft"}`}
      >
        <img
          className="openAppImg"
          src={chrome.runtime.getURL(
            "assests/images/left-arrow-line-symbol.png"
          )}
          alt="U"
        />
      </div>
    </StyledUtility>
  );
}
