import styled from "styled-components";
export const StyledHeader = styled.div`
    display:flex;
    background: bisque;
    height: 30px;
    justify-content: space-between;
    padding: 8px 8px;
    p{
        margin:0px;
    }
    .appname{
        text-align: center;
        width: 100%;
    }
    .notification{
        height: 22px;
        width: 22px;
        cursor:pointer;
        position: relative;
        img{
            position: relative;
            height: 100%;
            width: 100%;
        }
    }
`