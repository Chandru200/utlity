import styled from "styled-components";

export const StyledUtility = styled.div`
  position: absolute;
  top: 0px;
  right: 18px;
  z-index: 11111111;
  transition: right 0.5s ease;
  height: 100vh;
  display: flex;
  align-items: center;
  .openAppImgWrapper {
    display: flex;
    background: green;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
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
  .loader-wrapper {
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    gap: 10px;
    font-size: 20px;
    font-weight: 500;
    span {
      text-align: center;
    }
    .loader {
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #3498db;
      width: 120px;
      height: 120px;
      -webkit-animation: spin 2s linear infinite; /* Safari */
      animation: spin 2s linear infinite;

      /* Safari */
      @-webkit-keyframes spin {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
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
    height: 95%;
  }
  .sign-in {
    background: sandybrown;
    width: 400px;
    height: auto;
    border-radius: 4px;
    border: 2px solid blue;
    right: -100%;
    padding: 10px;
    height: 60vh;
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

  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color emoji !important;

  #utilityAppFromExtension{
    input::placeholder {
      font-size: 16px;
      font-weight: bolder;
      text-align-center;
     }
    }
    textarea {
      height: 140px;
    }
    input,
    textarea {
      padding: 10px;
      border-radius: 10px;
      border: 2px solid darkblue !important;
      background: whitesmoke;
    }
    input:focus-visible,
    textarea:focus-visible {
      outline: none;
    }
    button {
      color: white;
      border-radius: 8px;
      padding: 8px;
      cursor: pointer;
      border: none;
      min-width: 100px;
      font-size: medium;
      font-weight: 700;
      background-color: green;
    }
  }
  
`;

export const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  input,
  textarea,
  input::placeholder {
    font-size: 16px;
    font-weight: bolder;
}
  }
  textarea {
    height: 140px;
  }
  input,
  textarea {
    padding: 10px;
    border-radius: 10px;
    border: 2px solid darkblue !important;
    background: whitesmoke;
  }
  input:focus-visible,
  textarea:focus-visible {
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
  #datetimepicker{
    letter-spacing:1px;
    text-align: center;
  }
  .xdsoft_datetimepicker{
    z-index:11111111;
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
