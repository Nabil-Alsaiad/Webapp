import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userType, setUserType] = useState("");
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

    if (!userType || !email || !password) {
      return;
    }

    // Check if email is a valid email string
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return;
    }

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
      const { loggedIn, error } = await res.json();
      if (error) {
        console.error(error);
        return;
      }

      if (!loggedIn) {
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    }

    localStorage.setItem("loggedInAccount", JSON.stringify({ email, userType }));
    navigate("/");
  };

  return (
    <div>
      <h1>Visitor Management System</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User Type:
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="">Select User Type</option>
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="tenant">Tenant</option>
            <option value="security">Security</option>
            <option value="contractor">Contractor</option>
            <option value="developer">Developer</option>
            <option value="visitor">Visitor</option>
            <option value="delivery">Delivery</option>
          </select>
        </label>
        <br />
        <label>
          User ID:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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
