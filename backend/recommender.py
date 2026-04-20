import pandas as pd
import ast
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# -------------------------------
# LOAD DATASETS
# -------------------------------
tmdb = pd.read_csv("data/tmdb_5000_movies.csv")
custom = pd.read_csv("data/my_movies.csv", engine="python", on_bad_lines="skip")

# -------------------------------
# CLEAN TMDB DATA
# -------------------------------
tmdb = tmdb[['title', 'overview', 'genres']].dropna()

def convert(obj):
    L = []
    for i in ast.literal_eval(obj):
        L.append(i['name'].lower())
    return L

tmdb['genres'] = tmdb['genres'].apply(convert)
tmdb['language'] = "english"

# -------------------------------
# CLEAN CUSTOM DATA (FIXED 🔥)
# -------------------------------
custom = custom.dropna()

for idx in range(len(custom)):
    try:
        custom.at[idx, 'genres'] = [
            i.lower() for i in ast.literal_eval(custom.at[idx, 'genres'])
        ]
    except Exception as e:
        print(f"❌ Error at CSV line {idx + 2}: {custom.at[idx, 'genres']}")
        custom.at[idx, 'genres'] = []

# -------------------------------
# MERGE DATASETS
# -------------------------------
movies = pd.concat([tmdb, custom], ignore_index=True)

# -------------------------------
# CREATE TAGS (features)
# -------------------------------
movies['tags'] = movies['overview'] + " " + movies['genres'].apply(lambda x: " ".join(x))

# -------------------------------
# VECTORIZATION
# -------------------------------
tfidf = TfidfVectorizer(stop_words='english')
vectors = tfidf.fit_transform(movies['tags']).toarray()

# -------------------------------
# SIMILARITY MATRIX
# -------------------------------
similarity = cosine_similarity(vectors)

# -------------------------------
# MOOD → GENRE MAP
# -------------------------------
mood_map = {
    "happy": ["comedy", "family", "romance"],
    "sad": ["drama", "romance"],
    "angry": ["action", "crime"],
    "relaxed": ["comedy", "family"],
    "excited": ["action", "thriller", "adventure"],
    "horror": ["horror"]   # 🔥 NEW
}

# -------------------------------
# RECOMMEND FUNCTION
# -------------------------------
def recommend_by_mood(mood, language=None):
    genres = mood_map.get(mood, [])

    filtered = movies[movies['genres'].apply(
        lambda x: isinstance(x, list) and any(g in x for g in genres)
    )]

    if language:
        filtered = filtered[filtered['language'] == language]

    # ❌ No randomness
    return filtered['title'].head(10).tolist()