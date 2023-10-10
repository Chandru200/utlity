import styled from "styled-components";
export const StyledTL = styled.div`
  background: #edeade;
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
  .tabname {
    font-size: 20px;
    text-align: center;
  }
  .tab-wrapper {
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .tab-form {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
    .tab-limit {
      font-size: 20px;
    }
    input {
      max-width: 100px;
      font-size: 30px;
      text-align: center;
      height: 45px;
    }
  }

  .taboperations {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .list-tabs {
      font-size: 20px;
      font-weight: 500;
    }
    .tabs-wrapper:hover {
      background-color: blanchedalmond;
      .close {
        display: flex;
      }
    }

    .tabs-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid darkgoldenrod;
      border-radius: 10px;
      padding: 12px;
      .tab-details {
        width: 100%;
        span {
          font-size: 18px;
          font-weight: 500;
        }
        div {
          overflow-wrap: anywhere;
        }
      }
      .close {
        height: 25px;
        width: 25px !important;
        background: none;
        border-radius: 50%;
        display: flex;
        min-width: 0px;
        display: none;
        align-items: center;
        justify-content: center;
        color: black;
        padding: 0px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .tab {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;
