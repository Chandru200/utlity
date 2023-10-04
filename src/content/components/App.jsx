import React ,{useState} from "react";
import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import Login from './Signin'
import { StyledUtility } from './styles/styledUtility.style';
import {notifyBackgroundPage} from '../message'

export function App(){
    const[showUtility,setShowUtility] = useState(false);
    const[canShowApp,setCanShow] =  useState(false);
    const[contents,setContents] = useState(["tablimitter","taskmanager","limitwebsite"]);
    const[checkingStatus,setCheckingstatus] = useState(true);
    const[loginError,setLoginError] = useState("")
    const [signin,setSignIn] = useState(true);
    const leftarrow = chrome.runtime.getURL('assests/images/left-arrow-line-symbol.png');
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        switch(request.message.message){
            case "canShowApp":
                setCanShow(request.message.data);
                setCheckingstatus(false);
                break;
            case "login_error":
                setLoginError(request.message.data);
                break;
            case "showsign":
                setSignIn(true)
        }
      });
    
    return(
        <StyledUtility showUtility={showUtility}>
            {showUtility &&
                (canShowApp 
                    ?(<div className="UtilityWraper">
                        <Header/>
                        <Content contents={contents} setContents={setContents}/>
                        <Footer contents={contents} setContents={setContents}/>
                    </div>)
                    :(
                        checkingStatus 
                        ?<div className="UtilityWraper"> Verifying Authenticity</div> 
                        :<Login signin={signin} setSignIn={setSignIn} loginError={loginError}/>
                    )
                )
            }
            <div 
                onClick={()=>{setShowUtility(!showUtility);notifyBackgroundPage("canShowApp");}} 
                className={ `openAppImgWrapper ${showUtility && "showleft"}`}>
                <img 
                    className="openAppImg"
                    src={leftarrow} alt="U"/>
            </div>
        </StyledUtility>
    )
}