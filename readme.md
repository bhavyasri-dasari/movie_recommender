# 🎬 Movie Mood Recommender

An AI-based movie recommendation system that suggests movies based on your **mood, energy level, and preferences**.

---

## 🚀 Features

* 🎯 Mood-based movie recommendations
* 🌍 Multi-language support (English, Telugu, Hindi)
* ❤️ Add / Remove favorites
* 👤 User profile with editable details
* 🎬 Real movie posters using TMDB API
* ⚡ Fast and responsive UI
* 🔍 Personalized filtering (feeling, energy, goal, language)

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* JavaScript
* CSS

### Backend

* Flask (Python)
* Pandas
* Scikit-learn

### APIs

* TMDB (The Movie Database API)

---
## 📸 Screenshots
<img width="829" height="498" alt="image" src="https://github.com/user-attachments/assets/d75f35f5-5c91-45d8-9a3a-6c667c077f79" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3505ee09-ca10-40b6-9f72-4449241307d2" />
<img width="1493" height="957" alt="image" src="https://github.com/user-attachments/assets/45070d56-3cea-4b11-9966-00c2437e0e0a" />
<img width="1486" height="537" alt="image" src="https://github.com/user-attachments/assets/52987e22-cd86-4ab2-9e6f-3840aa7ee0b5" />




## 📂 Project Structure

```text
movie-mode-recommender/
│
├── backend/
│   ├── app.py
│   ├── recommender.py
│   └── data/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/movie-mode-recommender.git
cd movie-mode-recommender
```

---

### 🔹 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Server runs on:

```
http://127.0.0.1:5000
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file inside `frontend/`:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

👉 Get API key from: https://www.themoviedb.org/

---

## ❤️ How It Works

1. User selects:

   * Feeling (Happy, Sad, Angry)
   * Energy level
   * Goal (Feel good, Emotional, Thriller, Horror)
   * Language

2. Backend processes input → detects mood

3. Movies are filtered from dataset

4. Frontend displays:

   * Movie list
   * Posters (via TMDB)
   * Favorite toggle ❤️

---


### 🏠 Home Page

![Home](screenshots/home.png)

### 🎯 Recommendation Results

![Recommendations](screenshots/recommendations.png)

### ❤️ Favorites Section

![Favorites](screenshots/favorites.png)

### 👤 User Profile

![Profile](screenshots/profile.png)

---

## 🚀 Future Improvements

* 🔐 Authentication (Firebase / JWT)
* 🎥 Trailer preview on hover
* ⭐ Ratings & reviews
* 📱 Mobile responsive UI
* 🌐 Deployment (Vercel + Render)

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

---

## 📌 Author

**Bhavya Sri Dasari**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
