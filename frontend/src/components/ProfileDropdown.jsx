import { useNavigate } from "react-router-dom";

function ProfileDropdown() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ background: "#222", padding: "10px" }}>
      <p>{user?.name}</p>

      <button onClick={() => navigate("/profile")}>
        View Profile
      </button>

      <button onClick={() => {
        localStorage.removeItem("user");
        window.location.href = "/";
      }}>
        Logout
      </button>
    </div>
  );
}

export default ProfileDropdown;