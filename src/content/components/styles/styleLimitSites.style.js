import styled from "styled-components";
export const StyledLS = styled.div`
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
  .options-wrapper {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    .options {
      cursor: pointer;
      background: blanchedalmond;
      padding: 12px;
      border-radius: 8px;
    }
    .selected,
    .options:hover {
      background-color: burlywood;
    }
  }
  .content-weblimit {
    height: calc(100% - 140px);
    display: flex;
    flex-direction: column;
    gap: 10px;
    span{
        color: black;
        font-weight: 500;
    }
    .setWebsiteTab-wrapper{
        .setWebForm{
            display: flex;
            justify-content: center;
            width: 100%;
            flex-direction: column;
            gap: 12px;  
            .red-border{
                border:2px solid red !important;
            }
         }
         .time-wrapper{
            display: flex;
            width: 100%;
            justify-content: space-around;
            input{
              cursor:pointer;
            }
         }
        }
    }
    .overflow{
      overflow:auto;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .weblimit-wrapper{
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
        .head{
            font-size: 18px;
            font-weight: 500;
            text-align:center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            .edit-wrap{
              height: 20px;
              width: 20px;
              cursor:pointer;
              img{
                height:100%;
                width:100%;
              }
            }
        }
        .stats-tab{
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 10px;
            overflow: auto;
            height: 100%;
            background: antiquewhite;
            .emptystate{
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              width: 100%;
              font-size: xx-large;
              font-weight: 500;
              color: crimson;
            }
            .limit-wrapper:hover{
              .options-wrapper{
                display:flex;
              }
            }
            .limit-wrapper{
              display: flex;
              align-items: center;
              justify-content: space-between;
              .stats-wrapper{
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 4px;
                word-break:break-all;
              }
              .options-wrapper{
                display:none;
                gap:8px;
                background: lightskyblue;
                padding: 8px;
                cursor: pointer;
                border-radius: 8px;
                .edit_limit,.delete_limit{
                  img{
                    height: 20px;
                    width: 20px;
                  }
                }
            }
          }
        }
    }
    }
  }
`;
