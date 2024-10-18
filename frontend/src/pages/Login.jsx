import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";

const Login = () => {
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  // Navigate hook
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  };

  // console.log("Login Info --->", signupInfo);

  const handleForm = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("email and password required !");
    }

    // API CALL
    try {
      const url = "http://localhost:9090/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, name, jwtToken, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("LoggedInUser", name);
        setTimeout(() => {
          navigate("/home");
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
      <h1>Login</h1>
      <form onSubmit={handleForm}>
        <div>
          {/* For email */}
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            placeholder="Enter Your Email.."
            name="email"
            value={loginInfo.email}
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
            value={loginInfo.password}
          />
        </div>

        {/* Submit button */}
        <button>SignUp</button>
        <span>
          Does't have an account?
          <Link to="/signup">Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
