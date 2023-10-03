import React ,{useState} from "react";
import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import { StyledUtility } from './styles/styledUtility.style';


export function App(){
    const[showUtility,setShowUtility] = useState(false)
    const[contents,setContents] = useState(["tablimitter","taskmanager","limitwebsite"])
    const leftarrow = chrome.runtime.getURL('assests/images/left-arrow-line-symbol.png'); 
    return(
        <StyledUtility showUtility={showUtility}>
            {showUtility ?
                <div className="UtilityWraper">
                    <Header/>
                    <Content contents={contents} setContents={setContents}/>
                    <Footer contents={contents} setContents={setContents}/>
                </div>
                :
                <div 
                    onClick={()=>setShowUtility(true)} 
                    className="openAppImgWrapper">
                    <img 
                        className="openAppImg"
                        src={leftarrow} alt="U"/>
                </div>
            }
        </StyledUtility>
    )
}