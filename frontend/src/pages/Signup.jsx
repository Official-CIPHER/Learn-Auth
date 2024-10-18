import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";

const Signup = () => {
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Navigate hook
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copysignupInfo = { ...signupInfo };
    copysignupInfo[name] = value;
    setsignupInfo(copysignupInfo);
  };

  // console.log("Login Info --->", signupInfo);

  const handleForm = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("name, email and password required !");
    }

    // API CALL
    try {
      const url = "http://localhost:9090/auth/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(err);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleForm}>
        <div>
          {/* For Name */}
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter Your Name.."
            name="name"
            autoFocus
            value={signupInfo.name}
          />
        </div>
        <div>
          {/* For email */}
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            placeholder="Enter Your Email.."
            name="email"
            value={signupInfo.email}
          />
        </div>
        <div>
          {/* For password */}
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            placeholder="Enter Your Password.."
            name="password"
            value={signupInfo.password}
          />
        </div>

        {/* Submit button */}
        <button>SignUp</button>
        <span>
          Already have an account?
          <Link to="/login">Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;
