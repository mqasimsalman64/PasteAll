import React from 'react'
import "./DropDown.css"

const InputField = (props) => {
  const handleChange = (e) => {
    if (e.target.name === "title") {
      props.setTitle(e.target.value);
    } else if (e.target.name === "search") {
      props.setSearch(e.target.value);
    }
  };

  return (
    <div className='input-container'>
      <i className={props.desc + " searchfav"}></i>
      <input
        name={props.name}           // ✅ makes "title" or "search"
        value={props.value}         // ✅ bind state from App.jsx
        onChange={handleChange}
        type="text"
        placeholder={props.name}
        className='inputfield'
      />
    </div>
  )
}

export default InputField;
