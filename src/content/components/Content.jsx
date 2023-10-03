import React from "react";
import { StyledContent} from './styles/styleContent.style';
import TaskManager from './TaskManager';
import TabLimitter from './TabLimitter';
import LimitWebsite from './LimitSites';
export default function Content({contents,setContents}){
    return(
        <StyledContent>
            {contents[0] === "taskmanager" && <TaskManager/>}
            {contents[0] === "tablimitter" && <TabLimitter/>}
            {contents[0] === "limitwebsite" && <LimitWebsite/>}
        </StyledContent>
    )
}