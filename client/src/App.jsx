import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import DropDown from "./components/DropDown";
import Button from "./components/Button";
import InputField from "./components/InputField";
import YourTextInput from "./components/YourTextInput";
import AllPastes from "./components/AllPastes";

const App = () => {
  const timeOptions = [
    { value: "1m", label: "1 Month" },
    { value: "1d", label: "1 Day" },
    { value: "1y", label: "1 Year" },
  ];

  const visibilityOptions = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
  ];

  const typeOptions = [
    { value: "code", label: "Code" },
    { value: "text", label: "Text" },
    { value: "json", label: "JSON" },
  ];

  // States
  const [timeToComplete, setTimeToComplete] = useState("1m");
  const [type, setType] = useState("code");
  const [privacy, setPrivacy] = useState("public");
  const [title, setTitle] = useState("");
  const [descrip, setDescrip] = useState("");

  const [users, setUsers] = useState([]); 
  const [allTitles, setAllTitles] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [searchId, setSearchId] = useState(""); 

  // 🔑 Ref for focusing Type dropdown
  const typeRef = useRef(null);

  // ------------------- Create -------------------
  const createUser = async () => {
    const user = { title, timeToComplete, type, visibility: privacy, descrip };

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
      await response.json();

      fetchUsers();
      clearForm();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  // ------------------- Fetch All -------------------
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const usersData = await res.json();

      setUsers(usersData);
      setAllTitles(
        usersData.map((user) => ({
          value: user.title,
          label: user.title,
          id: user.id,
        }))
      );
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ------------------- Update -------------------
  const updateUser = async () => {
    if (!searchId) {
      console.warn("No user selected for update.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${searchId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, descrip, timeToComplete, type, visibility: privacy }),
      });

      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
      await response.json();

      fetchUsers();
      clearForm();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };
   const deleteUser = async (id) => {
    
    if (!id) {
      console.warn("No user selected to delete.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      console.log("check database if data deleted");
      
    // setSearchId("");
      
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // ------------------- Helpers -------------------
  const clearForm = () => {
    setTitle("");
    setDescrip("");
    setType("code");
    setPrivacy("public");
    setTimeToComplete("1m");
    setSearchId("");
    setSearch("");
  };

 return (
  <div className="main">
    <div className="allcontent">
      {/* Dropdowns */}
      <div className="dropdowncon">
        <DropDown
          name="contentType"
          options={typeOptions}
          value={type}
          onChange={setType}
          ref={typeRef}
        />
        <DropDown
          name="duration"
          options={timeOptions}
          value={timeToComplete}
          onChange={setTimeToComplete}
        />
        <DropDown
          name="privacy"
          options={visibilityOptions}
          value={privacy}
          onChange={setPrivacy}
        />

        {/* Show Create button always */}
        <Button name="Create Paste" onClick={createUser} />

        {/* Show Update button only when editing */}
        {searchId && (
          <Button name="Update Paste" onClick={updateUser} />
        )}
      </div>

      {/* Title input */}
      <InputField name="title" value={title} setTitle={setTitle} />

      {/* Description input */}
      <YourTextInput descrip={descrip} setDescrip={setDescrip} />

      {/* Dropdown for all user titles */}
      <DropDown
        name="titles"
        options={allTitles}
        defaultValue=""
        value={search}
        onChange={setSearch}
      />

      {/* Show selected paste */}
      <AllPastes
        search={search}
        users={users}
        setUpdateTitle={setTitle}
        setDescrip={setDescrip}
        setType={setType}
        setPrivacy={setPrivacy}
        setTimeToComplete={setTimeToComplete}
        setSearchId={setSearchId}
        typeRef={typeRef}
         deleteUser={deleteUser}
         clearForm={clearForm} 
      />
    </div>
  </div>
);

};

export default App;
