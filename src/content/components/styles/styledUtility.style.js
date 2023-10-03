import styled from "styled-components";

export const StyledUtility = styled.div`
    position: absolute;
    top: ${props => props.showUtility ? "30%" : "50%"};
    right: 0;
    z-index: 11111111;
    transition: right 0.5s ease; 
    .openAppImgWrapper{
        background: chocolate;
        padding: 10px;
        cursor:pointer;
        .openAppImg{
            height:16px;
            width:16px;
        }
    }
    .UtilityWraper{
        background: white;
        width: 400px;
        height: auto;
        border-radius: 4px;
        border: 2px solid blue;
        right: -100%;
        
    }

`