import React, { useState } from "react";

const FloatingInput = ({
  labelText,
  icon,
  onChangeValue,
  textValue,
  inputType,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(textValue);

  const handleTextChange = (text) => {
    setValue(text);

    if (text !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    onChangeValue(text);
  };

  return (
    <div
      id="float-label"
      style={{
        paddingLeft: "10%",
        paddingRight: "10%",
      }}
    >
      <input
        value={value}
        onChange={({ target: { value } }) => handleTextChange(value)}
        type={inputType}
      />
      <label className={isActive ? "Active" : ""}>
        {icon} {labelText}
      </label>
    </div>
  );
};

export default FloatingInput;
