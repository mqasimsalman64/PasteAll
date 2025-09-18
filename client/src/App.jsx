import React, { useState, useEffect } from "react";
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

  const Visibility = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
  ];

  const typeOfContent = [
    { value: "code", label: "Code" },
    { value: "text", label: "Text" },
    { value: "json", label: "JSON" },
  ];

  const [timeToComplete, setTimeToComplete] = useState("1m");
  const [type, setType] = useState("code");
  const [privacy, setPrivacy] = useState("public");
  const [Title, setTitle] = useState("");
  const [descrip, setDescrip] = useState("");
  const [search, setSearch] = useState(""); // for selected title
  const [users, setUsers] = useState([]);   // store all users
  const [allTitles, setAllTitles] = useState([]); // dropdown titles only
  const [updateUser, setupdateUser] = useState([]);
  const [searchid, setSearchid] = useState("");//setting searchid for all paste 

  // Create user
  const createUser = async () => {
    const user = {
      title: Title,
      timeToComplete,
      type,
      visibility: privacy,
      descrip,
    };

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log("User created:", data);

      // Refresh users after creating one
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };
  // const createUser = async () => {
  //   const user = {
  //     title: Title,
  //     timeToComplete,
  //     type,
  //     visibility: privacy,
  //     descrip,
  //   };

  //   try {
  //     const response = await fetch("http://localhost:5000/api/users", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(user),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json(); // only works if backend returns JSON
  //     console.log("User created:", data);

  //     fetchUsers(); // refresh users
  //   } catch (err) {
  //     console.error("Error creating user:", err);
  //   }
  // };


  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/id");
      const usersData = await res.json();

      // setUsers(usersData);

      // prepare dropdown titles
      // const titles = usersData.map((user) => ({
      //   value: user.title,
      //   label: user.title,
      //   id:user.id,
      // }));
      // setAllTitles(titles);
    } catch (err) {
      // console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const updateuser= async()=>{
     try {
      const response = await fetch(`http://localhost:5000/api/users:${searchid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchid),
    });

      // prepare dropdown titles
      const titles = usersData.map((user) => ({
        value: user.title,
        label: user.title,
        id:user.id,
      }));
      setAllTitles(titles);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }
  // const updateuser = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/users/${searchid}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         title: updateUser,  // comes from state
  //         descrip: "Updated description",
  //         // add more fields if needed
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log("User updated:", data);

  //     // refresh titles after update
  //     const titles = users.map((user) => ({
  //       value: user.title,
  //       label: user.title,
  //       id: user.id,
  //     }));
  //     setAllTitles(titles);

  //   } catch (err) {
  //     console.error("Error updating user:", err);
  //   }
  // };

  return (
    <div className="main">
      <div className="allcontent">
        <div className="dropdowncon">
          <DropDown
            name="contentType"
            options={typeOfContent}
            defaultValue="code"
            value={type}
            onChange={setType}
          />

          <DropDown
            name="duration"
            options={timeOptions}
            defaultValue="1m"
            value={timeToComplete}
            onChange={setTimeToComplete}
          />

          <DropDown
            name="privacy"
            options={Visibility}
            defaultValue="public"
            value={privacy}
            onChange={setPrivacy}
          />



          <Button name="Create Paste" onClick={createUser} />
        </div>

        {/* Title input */}
        <InputField name="title" value={Title} setTitle={setTitle} />

        {/* Description input */}
        <YourTextInput descrip={descrip} setDescrip={setDescrip} />
        {/* ✅ Dropdown for all user titles */}
        <DropDown
          name="titles"
          options={allTitles}
          defaultValue=""
          value={search}
          onChange={setSearch}
        // onChange={handleChange}
        />

        {/* Show selected user details */}
        {/* <AllPastes search={search} users={users} 
          updateuser={updateuser}
          setupdateUser={setupdateUser}
          searchid={searchid}
          setSearchid={setSearchid}
        /> */}
       
      </div>
    </div>
  );
};

export default App;
