import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [LoggedInUser, setLoggedInUser] = useState("");

  const [products, setProducts] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("LoggedInUser"));
  });

  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedInUser");
    handleSuccess("User LogOut !");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProduct = async () => {
    try {
      const url = "http://localhost:9090/product";

      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await fetch(url, headers); // get data that why we pass only url
      const result = await response.json();
      setProducts(result);
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };

  // Call API to get the data
  useEffect(() => {
    fetchProduct();
  });

  return (
    <div>
      <h1>{LoggedInUser}</h1>
      <button onClick={handleLogout}>LogOut</button>
      <div>
        {products &&
          products?.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name} : {item.price}{" "}
              </span>
            </ul>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
