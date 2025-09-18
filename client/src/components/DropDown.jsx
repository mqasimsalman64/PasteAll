import "./DropDown.css";
import React from "react";

const DropDown = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="dropDownContainer">
      <select 
        name={props.name} 
        value={props.value}   // ✅ controlled
        onChange={handleChange}
      >
        {/* Optional placeholder if no value is selected */}
        {props.defaultValue === "" && (
          <option value="">-- Select --</option>
        )}

        {props.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
