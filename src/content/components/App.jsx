import React, { useState, useEffect } from "react";
import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Signin";
import { StyledUtility } from "./styles/styledUtility.style";
import { notifyBackgroundPage } from "../message";

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
      let message_name = message.request?.message?.message;
      let data = message.request?.message?.data;
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
      }
    }
  }, [message]);

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
