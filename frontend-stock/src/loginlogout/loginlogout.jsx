import React, { useState } from "react";
import App from "../kkdashboard/dashboard";

export default function LoginRegButton() {
  const [showModal, setShowModal] = useState(false);
  const [showlogModal, setShowlogModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const openLoginForm = () => {
    setShowlogModal(true);
    document.getElementById("loginform").style.display = "block";
    document.getElementById("registrationform").style.display = "none";
    setFormData({
      email: "",
      password: "",
    });
  };

  const openRegistrationForm = () => {
    setShowModal(true);
    // document.getElementById("loginform").style.display = "none";
    document.getElementById("registrationform").style.display = "block";
    setFormData({
      email: "",
      password: "",
    });
  };

  const closeregistration = () => {
    setShowModal(false);
    document.getElementById("registrationform").style.display = "none";
  };

  const closelogIn = () => {
    setShowlogModal(false);
    document.getElementById("loginform").style.display = "none";
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log("FormData:", formData);
  };

  const registerUser = () => {
    const payload = {
      userEmail: formData.inregEmail,
      userPassword: formData.inregPassword,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(
      "https://7d238dba-17a0-4192-b3f2-8f7132a5b800-00-2m11dy39x9dz7.pike.replit.dev/user-registration",
      options,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Registration successful!..please logIn");
        closeregistration();
        openLoginForm();
      })
      .then((data) => {
        console.log("Registration successful:", data);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };
  const logInUser = () => {
    const payload = {
      userEmail: formData.InloginEmail,
      userPassword: formData.InloginPassword,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(
      "https://7d238dba-17a0-4192-b3f2-8f7132a5b800-00-2m11dy39x9dz7.pike.replit.dev/login",
      options,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("LogIn successful!..please logIn");
        closelogIn();
        setIsLoggedIn(true);
      })
      .then((data) => {
        console.log("Registration successful:", data);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  if (isLoggedIn) {
    return <App />;
  }

  return (
    <div id="buttons">
      <button onClick={openRegistrationForm} className="logregbutton">
        <span>Register</span>
      </button>
      <button onClick={openLoginForm} className="logregbutton">
        <span>Login</span>
      </button>

      {showModal && (
        <div id="registrationform" className="form-popup">
          <span className="close-icon" onClick={closeregistration}>
            &times;
          </span>
          <form className="form-container" id="registration">
            <h2>Registration Form</h2>
            <div className="form-group">
              <label for="regEmail">
                <b>Email</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="regEmail"
                id="inregEmail"
                onChange={handleInputChange}
                value={formData.inregEmail}
                required
              />
            </div>
            <div className="form-group">
              <label for="regPassword">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="regPassword"
                id="inregPassword"
                onChange={handleInputChange}
                value={formData.inregPassword}
                required
              />
            </div>
            <button type="button" onClick={registerUser} id="submitButton">
              Submit
            </button>
          </form>
        </div>
      )}

      {showlogModal && (
        <div id="loginform" className="form-popup">
          <span className="close-icon" onClick={closelogIn}>
            &times;
          </span>
          <form className="form-container" id="login">
            <h2>Login Form</h2>
            <div className="form-group">
              <label for="loginEmail">
                <b>Email</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="loginEmail"
                id="InloginEmail"
                value={formData.InloginEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label for="loginPassword">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="loginPassword"
                id="InloginPassword"
                onChange={handleInputChange}
                value={formData.InloginPassword}
                required
              />
            </div>
            <button type="button" onClick={logInUser} id="submitButton">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
