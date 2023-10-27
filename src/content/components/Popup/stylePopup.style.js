import styled from "styled-components";
export const StyledPopup = styled.div`
  position: fixed;
  background: burlywood;
  padding: 26px;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  border-radius: 20px;
  overflow: hidden;
  .popup-header {
    font-size: 25px;
    text-align: center;
    font-weight: 400;
    color: black;
  }
  .popup-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .semibold {
    font-weight: 300 !important;
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
    .yes-loader {
      font-size: 0;
      height: 40px;
    }
    .yes-loader::after {
      content: "";
      display: flex;
      position: relative;
      width: 16px;
      height: 16px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border: 4px solid transparent;
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: button-loading-spinner 1s ease infinite;
    }

    @keyframes button-loading-spinner {
      from {
        transform: rotate(0turn);
      }

      to {
        transform: rotate(1turn);
      }
    }
  }
`;
