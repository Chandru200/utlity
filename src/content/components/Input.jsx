import React, { useState } from 'react';
import { StyledInput,StytledLabel  } from "./styles/styledUtility.style"
export default function Input({name,required,label,placeholder,loginDetails,setLoginDetails}) {
    const[showPass,setShowPass] = useState(false);
    const handleFormdata = (e,name)=>{
        // {...loginDetails,name:e.currentTarget.value}
        if(name =="text"){
            setLoginDetails({...loginDetails,name:e.currentTarget.value})
        }else if(name =="password"){
            setLoginDetails({...loginDetails,password:e.currentTarget.value})
        }
        else if(name =="email"){
            setLoginDetails({...loginDetails,email:e.currentTarget.value})
        }
        
    }
return (
    <StyledInput>
        <label>
            <StytledLabel>{label}</StytledLabel>
            {required && <span className='required'>*</span>}
        </label>
        <input 
            type={showPass ?"text":name}
            placeholder={placeholder}
            onChange={(e)=>{handleFormdata(e,name)}}></input>
         <label className='showPass'>
         {
         name==="password" && 
            <>
                <StytledLabel>Show Password</StytledLabel>
                <input onChange={(e)=>{ setShowPass(e.target.checked) }} type="checkbox"/>
            </>
        }
        </label>
    </StyledInput>
)
}