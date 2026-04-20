import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const currentUser = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!currentUser || !users[currentUser]) {
    navigate("/");
  }

  const [user, setUser] = useState(users[currentUser]);

  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState(users[currentUser]);

  // 💾 Save
  const saveProfile = () => {
    const updatedUsers = JSON.parse(localStorage.getItem("users")) || {};

    updatedUsers[currentUser] = {
      ...updatedUsers[currentUser],
      ...tempUser
    };

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUser(tempUser);
    setEditMode(false);
  };

  // ❌ Cancel
  const cancelEdit = () => {
    setTempUser(user);
    setEditMode(false);
  };

  // ❌ Remove favorite
  const removeFavorite = (movie) => {
    const updatedUsers = JSON.parse(localStorage.getItem("users")) || {};

    const updatedFav = user.favorites.filter((m) => m !== movie);

    updatedUsers[currentUser].favorites = updatedFav;

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUser((prev) => ({
      ...prev,
      favorites: updatedFav
    }));
  };

  return (
    <div style={{ background: "#0b0f19", minHeight: "100vh", color: "white" }}>
      
      {/* 🔙 Back */}
      <button
        onClick={() => navigate("/home")}
        style={backBtn}
      >
        ⬅ Back
      </button>

      <div style={{ display: "flex", gap: "50px", padding: "30px" }}>

        {/* 👤 PROFILE */}
        <div style={{ width: "320px" }}>
          <h2>👤 Profile</h2>

          {!editMode ? (
            <>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Age:</b> {user.age || "-"}</p>
              <p><b>Phone:</b> {user.phone || "-"}</p>
              <p><b>Interest:</b> {user.interest || "-"}</p>

              <button style={primaryBtn} onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {/* NAME */}
              <input
                placeholder="Enter your name"
                value={tempUser.name || ""}
                onChange={(e) =>
                  setTempUser({ ...tempUser, name: e.target.value })
                }
                style={inputStyle}
              />

              {/* EMAIL */}
              <input
                placeholder="Email (cannot change)"
                value={tempUser.email || ""}
                disabled
                style={{ ...inputStyle, opacity: 0.6 }}
              />

              {/* AGE */}
              <input
                placeholder="Enter your age"
                value={tempUser.age || ""}
                onChange={(e) =>
                  setTempUser({ ...tempUser, age: e.target.value })
                }
                style={inputStyle}
              />

              {/* PHONE */}
              <input
                placeholder="Enter your phone number"
                value={tempUser.phone || ""}
                onChange={(e) =>
                  setTempUser({ ...tempUser, phone: e.target.value })
                }
                style={inputStyle}
              />

              {/* INTEREST */}
              <select
                value={tempUser.interest || ""}
                onChange={(e) =>
                  setTempUser({ ...tempUser, interest: e.target.value })
                }
                style={inputStyle}
              >
                <option value="">Select your interest</option>
                <option value="feel good">Feel Good</option>
                <option value="emotional">Emotional</option>
                <option value="thriller">Thriller</option>
                <option value="horror">Horror</option>
              </select>

              <button style={primaryBtn} onClick={saveProfile}>
                Save
              </button>

              <button style={secondaryBtn} onClick={cancelEdit}>
                Cancel
              </button>
            </>
          )}
        </div>

        {/* ❤️ FAVORITES */}
        <div style={{ flex: 1 }}>
          <h2>❤️ Favorites</h2>

          {user.favorites?.length === 0 ? (
            <p style={{ color: "#aaa" }}>No favorites added yet</p>
          ) : (
            <div style={gridStyle}>
              {user.favorites.map((movie, i) => (
                <div key={i} style={cardStyle}>
                  <p>{movie}</p>
                  <button
                    onClick={() => removeFavorite(movie)}
                    style={removeBtn}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* 🎨 STYLES */
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#1e1e2f",
  color: "white"
};

const primaryBtn = {
  width: "100%",
  padding: "10px",
  background: "#ff3d00",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px"
};

const secondaryBtn = {
  width: "100%",
  padding: "10px",
  background: "#444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px"
};

const backBtn = {
  margin: "20px",
  padding: "8px 12px",
  background: "#222",
  border: "none",
  borderRadius: "5px",
  color: "white",
  cursor: "pointer"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "20px"
};

const cardStyle = {
  background: "#111827",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center"
};

const removeBtn = {
  marginTop: "8px",
  padding: "5px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Profile;