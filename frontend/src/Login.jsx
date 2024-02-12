// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedAccount = localStorage.getItem("loggedInAccount");
    const loggedInAccount = savedAccount ? JSON.parse(savedAccount) : {};
    if (loggedInAccount.email) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    // Check if email is a valid email string
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return;
    }

    let accType;
    let id;

    try {
      const res = await fetch("http://localhost:8888/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const { id: loggedIn, accType: loggedInAccType, email: loggedInEmail, error } = await res.json();
      if (error) {
        console.error(error);
        return;
      }

      if (!loggedInEmail || !loggedInAccType) {
        return;
      }

      accType = loggedInAccType;
      id = loggedIn;
    } catch (err) {
      console.error(err);
      return;
    }

    localStorage.setItem("loggedInAccount", JSON.stringify({ id, accType, email }));
    navigate("/");
  };

  return (
    <div>
      <h1>Visitor Management System</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
        <label>For visitor or Delivery, Please register first</label>
        <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
