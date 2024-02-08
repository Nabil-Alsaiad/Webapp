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

    let accountType;

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
      const { email: loggedInEmail, accType: loggedInAccType, error } = await res.json();
      if (error) {
        console.error(error);
        return;
      }

      if (!loggedInEmail || !loggedInAccType) {
        return;
      }

      accountType = loggedInAccType;
    } catch (err) {
      console.error(err);
      return;
    }

    localStorage.setItem("loggedInAccount", JSON.stringify({ email, accountType }));
    navigate("/");
  };

  return (
    <div>
      <h1>Visitor Management System</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
