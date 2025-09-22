// DropDown.jsx
import React, { forwardRef } from "react";
import "./DropDown.css";

const DropDown = forwardRef(({ name, value, options, onChange }, ref) => {
  return (
    <div className="dropDownContainer">
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        ref={ref}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default DropDown;
