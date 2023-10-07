import React, { useState } from "react";
import { StyledInput, StytledLabel } from "./styles/styledUtility.style";
export default function Input({
  name,
  required,
  label,
  placeholder,
  ParentState,
  ChangeParentState,
  value,
  id,
}) {
  const [showPass, setShowPass] = useState(false);
  const handleFormdata = (e, name) => {
    if (name == "text") {
      ChangeParentState({ ...ParentState, name: e.currentTarget.value });
    } else if (name == "password") {
      ChangeParentState({ ...ParentState, password: e.currentTarget.value });
    } else if (name == "email") {
      ChangeParentState({ ...ParentState, email: e.currentTarget.value });
    } else if (name == "textarea") {
      ChangeParentState({ ...ParentState, description: e.currentTarget.value });
    }
  };
  return (
    <StyledInput>
      {name === "textarea" ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            handleFormdata(e, name);
          }}
        ></textarea>
      ) : (
        <>
          <label>
            <StytledLabel>{label}</StytledLabel>
            {required && <span className="required">*</span>}
          </label>
          <input
            type={showPass ? "text" : name}
            placeholder={placeholder}
            value={value}
            id={id ? id : ""}
            onChange={(e) => {
              handleFormdata(e, name);
            }}
          ></input>
          <label className="showPass">
            {name === "password" && (
              <>
                <StytledLabel>Show Password</StytledLabel>
                <input
                  onChange={(e) => {
                    setShowPass(e.target.checked);
                  }}
                  type="checkbox"
                />
              </>
            )}
          </label>
        </>
      )}
    </StyledInput>
  );
}
