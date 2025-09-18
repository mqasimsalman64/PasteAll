import React from 'react'
import "./DropDown.css"
const YourTextInput = (props) => {
const handleChange=(e)=>{
    props.setDescrip(e.target.value);
}


    return (
        <div className='section2'>
            <div className='sec2_sub1'>
                <div className='ThreeDots'>
                    <div className='colorDots1'></div>
                    <div className='colorDots2'></div>
                    <div className='colorDots3'></div>
                </div>
                <div className='copyicon'>
                    <i className="fa-solid fa-copy favcopy"></i>
                </div>
            </div>
            <div className='sec2_sub2'>
                <textarea onChange={handleChange} name="codeInput" id="InputText"></textarea>
            </div>
        </div>
    )
}

export default YourTextInput
