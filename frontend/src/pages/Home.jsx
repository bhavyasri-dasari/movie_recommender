import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Home() {
  const navigate = useNavigate();

  // 🔐 Redirect if not logged in
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) navigate("/");
  }, [navigate]);

  // 🎯 States
  const [feeling, setFeeling] = useState("");
  const [energy, setEnergy] = useState("");
  const [goal, setGoal] = useState("");
  const [language, setLanguage] = useState("");
  const [movies, setMovies] = useState([]);
  const [mood, setMood] = useState("");
  const [posters, setPosters] = useState({});

  // 🎬 Custom Posters
  const customPosters = {
    Pushpa: "https://image.tmdb.org/t/p/w500/9bZfR4FZ6uRzK7hR6R3x1.jpg",
    Eega: "https://image.tmdb.org/t/p/w500/eega.jpg",
    Magadheera: "https://image.tmdb.org/t/p/w500/magadheera.jpg",
    KGF: "https://image.tmdb.org/t/p/w500/kgf.jpg",
    Dangal: "https://image.tmdb.org/t/p/w500/dangal.jpg"
  };

  // 🎬 Fetch Poster
  const getPoster = async (movie) => {
    if (customPosters[movie]) return customPosters[movie];

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie}`
      );

      const data = await res.json();

      if (data.results && data.results.length > 0) {
        return "https://image.tmdb.org/t/p/w500" + data.results[0].poster_path;
      }

      return null;
    } catch {
      return null;
    }
  };

  // 🎥 Fetch movies + posters
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          feeling,
          energy,
          goal,
          language
        })
      });

      const data = await response.json();

      setMovies(data.recommendations);
      setMood(data.mood);

      const posterMap = {};

      for (let movie of data.recommendations) {
        const poster = await getPoster(movie);
        posterMap[movie] = poster;
      }

      setPosters(posterMap);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ❤️ Toggle Favorites (SAFE VERSION)
  const addToFavorites = (movie) => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    // 🔥 safety fix (important)
    if (!users[currentUser].favorites) {
      users[currentUser].favorites = [];
    }

    const favs = users[currentUser].favorites;

    if (favs.includes(movie)) {
      users[currentUser].favorites = favs.filter((m) => m !== movie);
    } else {
      users[currentUser].favorites.push(movie);
    }

    localStorage.setItem("users", JSON.stringify(users));
  };

  // ❤️ Check if saved
  const isFavorite = (movie) => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    return users[currentUser]?.favorites?.includes(movie);
  };

  return (
    <div style={{ background: "#0b0f19", minHeight: "100vh", color: "white" }}>
      <Navbar />

      {/* 🎬 HERO */}
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <h1 style={{ fontSize: "34px" }}>🎬 Discover Movies by Mood</h1>
        <p style={{ color: "#aaa" }}>
          Select your mood and get recommendations
        </p>
      </div>

      {/* 🎯 FILTERS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap"
        }}
      >
        <select onChange={(e) => setFeeling(e.target.value)}>
          <option value="">Feeling</option>
          <option value="happy">Happy 😊</option>
          <option value="sad">Sad 😢</option>
          <option value="angry">Angry 😡</option>
        </select>

        <select onChange={(e) => setEnergy(e.target.value)}>
          <option value="">Energy</option>
          <option value="high">High ⚡</option>
          <option value="low">Low 💤</option>
        </select>

        <select onChange={(e) => setGoal(e.target.value)}>
          <option value="">Goal</option>
          <option value="feel good">Feel Good 😂</option>
          <option value="emotional">Emotional 😭</option>
          <option value="thriller">Thriller 😎</option>
          <option value="horror">Horror 👻</option>
        </select>

        <select onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Language</option>
          <option value="english">English</option>
          <option value="telugu">Telugu</option>
          <option value="hindi">Hindi</option>
        </select>

        <button onClick={handleSubmit}>🎥 Recommend</button>
      </div>

      {/* 🎯 MOOD */}
      {mood && (
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          Mood: <span style={{ color: "#ff3d00" }}>{mood}</span>
        </h2>
      )}

      {/* 🎬 MOVIES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
          padding: "20px"
        }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            style={{
              background: "#111827",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              position: "relative"
            }}
          >
            {/* ❤️ HEART BUTTON */}
            <button
              onClick={() => addToFavorites(movie)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "22px",
                cursor: "pointer"
              }}
            >
              {isFavorite(movie) ? "❤️" : "🤍"}
            </button>

            <img
              src={
                posters[movie] ||
                "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={movie}
              style={{ width: "100%", borderRadius: "8px" }}
            />

            <p style={{ marginTop: "10px" }}>{movie}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;