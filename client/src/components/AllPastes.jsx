import React from "react";
import "./DropDown.css";

const AllPastes = ({
  search,
  users,
  setUpdateTitle,
  setDescrip,
  setType,
  setPrivacy,
  setTimeToComplete,
  setSearchId,
  typeRef,
  deleteUser,// 🔑 new ref
  clearForm
}) => {
  const selectedUser = users.find((user) => user.title === search);

const handleDelete = () => {
  if (!selectedUser) return;

  // setSearchId(selectedUser.id);
  deleteUser(selectedUser.id); // 👈 actually call deleteUser()
  console.log("🗑️ Deleting:", selectedUser.id);
      clearForm();
  
};

  const handleEditClick = () => {
    if (!selectedUser) return;

    // Send values back to parent form
    setUpdateTitle(selectedUser.title);
    setDescrip(selectedUser.descrip);
    setType(selectedUser.type);
    setPrivacy(selectedUser.visibility);
    setTimeToComplete(selectedUser.timeToComplete);
    setSearchId(selectedUser.id);

    // 🔑 Focus the type dropdown
    if (typeRef?.current) {
      typeRef.current.focus();
    }

    console.log("✏️ Editing:", selectedUser);
  };

  return (
    <div className="section3">
      <div className="sec3_heading">
        <h2>{search ? `Title: ${search}` : "No title selected"}</h2>
      </div>

      <div className="allPastes">
        {selectedUser ? (
          <>
            <div className="title_lastSec">
              <h2 style={{ color: "orange" }}>{selectedUser.title}</h2>
              <p><strong>Description:</strong> {selectedUser.descrip}</p>
            </div>

            <div className="lastSec_options">
              <div className="Final_favicons">
                <i className="edit finalicons fa-solid fa-pen" onClick={handleEditClick}></i>
                <i className="delete finalicons fa-solid fa-trash" onClick={handleDelete}></i>
                <i className="finalicons fa-solid fa-eye"></i>
                <i className="finalicons fa-solid fa-copy favcopy"></i>
              </div>
              <h4>Time to Complete: {selectedUser.timeToComplete}</h4>
            </div>
          </>
        ) : (
          <h3>Select a title</h3>
        )}
      </div>
    </div>
  );
};

export default AllPastes;
