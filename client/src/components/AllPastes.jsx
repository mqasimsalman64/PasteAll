import React from "react";
import "./DropDown.css";

const AllPastes = ({ search, users,updateuser,setupdateUser,searchid,setSearchid}) => {
  // Find the user matching the selected title
  const selectedUser = users.find((user) => user.title === search);

  const Editbtnfunction=(e)=>{
    const selectedUser = users.find((user) => user.title === search);
    setupdateUser(selectedUser.title);
    setSearchid(selectedUser.id);
    
  }

  return (
    <div className="section3">
      <div className="sec3_heading">
        <h2>{search ? `Title: ${search}` : "No title selected"}</h2>
      </div>

      <div className="allPastes">
        {selectedUser ? (
          <>
            {/* <h3>Selected Title's Content</h3> */}
            <div className="title_lastSec">
              <h2 style={{color:"orange"}}> {search}</h2>
            <p><strong>Description:</strong> {selectedUser.descrip}</p>
            </div>
           <div className="lastSec_options">
              <div className="Final_favicons">
                <i className=" edit finalicons fa-solid fa-pen" ></i>
                <i className="finalicons fa-solid fa-trash"></i>
                <i className="finalicons fa-solid fa-eye"></i>
                <i className="finalicons fa-solid fa-copy favcopy"></i>
              </div>
              <h4>Time to Complete: {selectedUser.timeToComplete}</h4>
           </div>
           
            {/* <p><strong>Type:</strong> {selectedUser.type}</p>
            <p><strong>Visibility:</strong> {selectedUser.visibility}</p>
             */}
          </>
        ) : (
          <h3>Select a title</h3>
        )}
      </div>
    </div>
  );
};

export default AllPastes;
