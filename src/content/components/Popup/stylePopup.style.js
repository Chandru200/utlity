import styled from "styled-components";
export const StyledPopup = styled.div`
  position: fixed;
  background: burlywood;
  padding: 32px;
  max-height: 41%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
  .popup-header {
    font-size: 25px;
    text-align: center;
    font-weight: 400;
    color: teal;
  }
  .popup-footer {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    button {
      color: white;
      border-radius: 8px;
      padding: 8px;
      cursor: pointer;
      border: none;
      min-width: 100px;
      font-size: medium;
      font-weight: 700;
    }
    .yes {
      background: green;
    }
    .no {
      background: red;
    }
  }
`;
