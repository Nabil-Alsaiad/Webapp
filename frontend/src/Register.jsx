import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [accType, setAccType] = useState("");
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

    if (!accType || !email || !password) {
      return;
    }

    // Check if email is a valid email string
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return;
    }

    try {
      const res = await fetch("http://localhost:8888/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          accType,
          email,
          password
        })
      });
      const { error } = await res.json();
      if (error) {
        console.error(error);
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    }

    navigate("/login");
  };

  return (
    <div>
      <h1>Visitor Management System</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Account Type:
          <select value={accType} onChange={(e) => setAccType(e.target.value)}>
            <option value="">Select Account Type</option>
            <option value="visitor">Visitor</option>
            <option value="delivery">Delivery</option>
          </select>
        </label>
        <br />
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

export default Register;
