import styled from "styled-components";

export const StyledUtility = styled.div`
  position: fixed;
  top: 0px;
  right: 18px;
  z-index: 11111111;
  transition: right 0.5s ease;
  height: 100vh;
  display: flex;
  align-items: center;
  .openAppImgWrapper {
    display: flex;
    background: chocolate;
    padding: 10px;
    cursor: pointer;
    .openAppImg {
      height: 16px;
      width: 16px;
    }
  }
  .showleft {
    left: -36px;
    position: absolute;
    top: 50%;
    transform: rotate(180deg);
  }
  .UtilityWraper {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    background: sandybrown;
    width: 400px;
    height: auto;
    border-radius: 4px;
    border: 2px solid blue;
    right: -100%;
    height: 70vh;
  }
  .sign-in {
    background: sandybrown;
    width: 400px;
    height: auto;
    border-radius: 4px;
    border: 2px solid blue;
    right: -100%;
    padding: 10px;
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
      margin: 0px;
      margin-bottom: 10px;
    }
    button {
      margin-top: 8px;
      height: 35px;
      width: 100px;
      border: 1px solid cornsilk;
      background: cornsilk;
      border-radius: 8px;
      cursor: pointer;
    }
    .sign-container {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 8px;
      u {
        cursor: pointer;
      }
    }
  }
`;

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  input,
  input::placeholder {
    font-size: 16px;
  }
  input {
    padding: 10px;
    border-radius: 10px;
    border: 2px solid darkblue !important;
    background: whitesmoke;
  }
  input:focus-visible {
    outline: none;
  }

  input[type="checkbox"] {
    margin: 0px;
    height: 20px;
    width: 20px;
  }

  .showPass {
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
  }

  label {
    display: flex;
    gap: 4px;
  }
  .required {
    color: red;
  }
`;

export const StyledError = styled.span`
  animation: horizontal-shaking 10s infinite;
  color: brown;
  font-family: inherit;
  font-size: 14px;
  @keyframes horizontal-shaking {
    25% {
      transform: translateX(10px);
    }
    75% {
      transform: translateX(100px);
    }
  }
`;

export const StytledLabel = styled.span`
  text-align: justify;
  font-weight: 400;
  font-size: 18px;
  max-width: 329px;
  label {
    display: flex;
    gap: 4px;
  }
`;
