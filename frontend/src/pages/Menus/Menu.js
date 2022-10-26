import React from "react";
import Axios from "axios";
import "css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Logo from "images/transp_amtilogo.png";


export default function Menu() {
  
  Axios.defaults.withCredentials = true;

  return (
    <>
      <div
        className="Menu"
        style={{
          justifyContent: "center",
          width: "100%",
          display: "flex",
          margins: "auto",
          textAlign: "center",
        }}
      >
        {/* <div>Hi - {loginStatus}!</div> */}
        <div className="container menuBox">
          <img
            src={Logo}
            alt="amtil logo"
            style={{
              width: "20%",
              display: "flex",
              marginLeft: "35%",
              marginRight: "35%",
              justifyContent: "center",
              textAlign: "center",
            }}
          ></img>
          <Link to="/">
            <button className="MainMenuBtn"> Back to Login</button>
          </Link>
         

          
        </div>
      </div>
    </>
  );
}
