import React from "react";
import { StyledTL } from "./styles/StyleTL.style";
import Input from "./Input";
export default function TabLimitter() {
  return (
    <StyledTL>
      <div className="tabname">Tab Limitter</div>
      <div>
        <Input
          name="input"
          label="Number of Tabs"
          ChangeParentState={"setTodo"}
          ParentState={"todo"}
        />
      </div>
    </StyledTL>
  );
}
