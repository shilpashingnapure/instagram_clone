import { useState } from "react";

export const InputField = ({ label, value, type, onChange, error , needKey , readOnly }) => {
    const [passwordVisiblity, setPasswordVisiblity] = useState(
      type === "password"
    );
    
    // this is handle for single value or if we are updating the specific key in the object
    function handleInput(e) {
      if(needKey){
        onChange(label , e.target.value)
      }else{
        onChange(e.target.value);
      }
      
    }
    return (
      <div className="flex flex-col gap-1 text-left">
        <label className={`label ${error && "error-label"} ${ readOnly && 'readOnly-input'}`}>
          <input
            type={passwordVisiblity ? "password" : "text"}
            className="input-field"
            value={value}
            onChange={handleInput}
            readOnly={readOnly}
          />
          <span className={`${value && "active-label"} label-text`}>{label}</span>
          {type === "password" && value && (
            <span
              className="absolute right-0 px-2 mt-1 "
              onClick={() => setPasswordVisiblity(() => !passwordVisiblity)}
            >
              {passwordVisiblity ? "show" : "hide"}
            </span>
          )}
        </label>
        {error && <div className="text-[11px] px-1 text-red-600 capitalize">{error}</div>}
      </div>
    );
  };