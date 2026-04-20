from flask import Flask, request, jsonify
from mood_engine import detect_mood
from recommender import recommend_by_mood
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# -------------------------------
# HOME ROUTE
# -------------------------------
@app.route("/")
def home():
    return "Mood Movie Recommender API Running 🚀"

# -------------------------------
# DETECT MOOD (OPTIONAL ROUTE)
# -------------------------------
@app.route("/detect-mood", methods=["POST"])
def mood():
    data = request.json
    mood = detect_mood(data)
    return jsonify({"mood": mood})

# -------------------------------
# RECOMMEND MOVIES (MAIN API)
# -------------------------------
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json

    # Detect mood from survey answers
    mood = detect_mood(data)

    # Get optional language
    language = data.get("language")

    # Get recommendations
    movies = recommend_by_mood(mood, language)

    return jsonify({
        "mood": mood,
        "language": language,
        "recommendations": movies
    })

# -------------------------------
# RUN SERVER
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
