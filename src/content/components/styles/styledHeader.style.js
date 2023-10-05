import styled from "styled-components";
export const StyledHeader = styled.div`
  display: flex;
  background: green;
  justify-content: space-between;
  padding: 20px 8px 20px 8px;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
  p {
    margin: 0px;
  } 
  .appname {
    text-align: center;
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    color:white;
}
  }
  .notification {
    height: 22px;
    width: 22px;
    cursor: pointer;
    position: relative;
    img {
      position: relative;
      height: 100%;
      width: 100%;
    }
  }
`;
