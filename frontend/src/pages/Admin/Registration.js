import React, { useState } from "react";
import Axios from "axios";
import "css/App.css";
import swal from "@sweetalert/with-react";

export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [fNameReg, setfNameReg] = useState("");
  const [lNameReg, setlNameReg] = useState("");
  const [titleReg, setlTitleReg] = useState("");

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("/register", {
      username: usernameReg,
      password: passwordReg,
      fName: fNameReg,
      lName: lNameReg,
      title: titleReg,
      email: emailReg,
    }).then((response) => {
      //if(response.data.errorCode === 2000) {
      if (response.data.status === 201) {
        swal("Yay!", response.data.message, "success");
      } else {
        swal("Whoops!", response.data.message, "warning");
      }
    });
  };

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>

        <input
          value={emailReg}
          placeholder="Email Address"
          style={{ margin: "3px" }}
          type="text"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />

        <input
          value={fNameReg}
          placeholder="First Name"
          style={{ margin: "3px" }}
          type="text"
          onChange={(e) => {
            setfNameReg(e.target.value);
          }}
        />

        <input
          value={lNameReg}
          placeholder="Last Name"
          style={{ margin: "3px" }}
          type="text"
          onChange={(e) => {
            setlNameReg(e.target.value);
          }}
        />

        <input
          value={titleReg}
          placeholder="Title"
          style={{ margin: "3px" }}
          type="text"
          onChange={(e) => {
            setlTitleReg(e.target.value);
          }}
        />

        <input
          value={usernameReg}
          placeholder="Enter Username"
          style={{ margin: "3px" }}
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder="password"
          value={passwordReg}
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register} style={{ margin: "10px" }}>
          {" "}
          Register{" "}
        </button>
      </div>
      <div>
        {" "}
        Already Registered? <a href="/">Login here.</a>
      </div>
    </div>
  );
}
