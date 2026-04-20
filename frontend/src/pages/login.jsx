import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name || !email) {
      alert("Enter name and email");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[email]) {
      users[email] = {
        name,
        email,
        favorites: [],
        age: "",
        phone: "",
        interest: ""
      };
    }

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", email);

    navigate("/home");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0b0f19",
        color: "white"
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: "30px",
          borderRadius: "10px",
          width: "300px",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)"
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>🎬 Login</h1>

        {/* NAME */}
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        {/* EMAIL ✅ FIX ADDED */}
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleLogin} style={buttonStyle}>
          Login
        </button>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "none",
  background: "#1e1e2f",
  color: "white"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#ff3d00",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Login;