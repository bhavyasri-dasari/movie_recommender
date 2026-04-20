import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  // ✅ Initialize directly (NO useEffect)
  const [name] = useState(() => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    return users[currentUser]?.name || "User";
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#111827",
        alignItems: "center"
      }}
    >
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
        🎬 MovieApp
      </h2>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <span>Hi, {name}</span>

        <button
          onClick={() => navigate("/profile")}
          style={btnPrimary}
        >
          Profile
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.href = "/"; // 🔥 ensures refresh
          }}
          style={btnSecondary}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const btnPrimary = {
  background: "#ff3d00",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  color: "white",
  cursor: "pointer"
};

const btnSecondary = {
  background: "#444",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  color: "white",
  cursor: "pointer"
};

export default Navbar;