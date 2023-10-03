import React from "react";
import {StyledHeader} from './styles/styledHeader.style'
export default function Header(){
    const notification_icon = chrome.runtime.getURL('assests/images/notification.png'); 

    return(
        <StyledHeader>
            <div className="appname">Utility App</div>
            <div className="notification">
                <img src={notification_icon}/>
            </div>

        </StyledHeader>
    )
}