import styled from "styled-components";
export const StyledTM = styled.div`
  background: #edeade;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  position:relative;
  .tabname {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
  }
  .all_tasks {
    .tab-header {
      padding-left:8px;
      font-size-18px;
      margin-bottom:20px;
      font-weight:700;
    }
    display: flex;
    flex-direction: column;
    justify-content: start;
    .task-wrapper:last-child .task-preview-wrapper {
      border-bottom: 1px solid darkgoldenrod;
    }
    .task-wrapper {
      .task-preview-wrapper {
        cursor:pointer;
        .todo-wrapper{
          display:flex;
          flex-direction:column;
          gap:8px;
        }
        display: flex;
        border: 1px solid darkgoldenrod;
        border-bottom: none;
        justify-content: center;
        align-items: center;
        padding: 0px 8px;
        height: 10vh;
        .name{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          max-width: 380px;
          max-height: 50px;
          overflow:hidden;
          -webkit-line-clamp: 2;
          font-weight:600;
        }
        .duedate{
          display: flex;
          gap: 4px;
          margin: 0px;
          align-items: center;
        }
        .options {
          display: none;
          align-items: center;
          gap: 10px;
          background: lightskyblue;
          border-radius: 8px;
          padding: 8px;
          .edit{
            cursor:pointer;
            height: 21px;
            width: 21px;
            img {
              height: 100%;
              width: 100%;
            }
          } 
        }
      }
      .task-preview-wrapper:hover {
        justify-content: space-between;
        background-color: blanchedalmond;
        .options {
          display: flex;
        }
      }
    }
    .description {
      padding:8px;
    }
  }
`;
