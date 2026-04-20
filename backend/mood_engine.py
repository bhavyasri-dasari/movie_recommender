def detect_mood(data):
    feeling = data.get("feeling")
    energy = data.get("energy")
    goal = data.get("goal")

    scores = {
        "happy": 0,
        "sad": 0,
        "angry": 0,
        "relaxed": 0,
        "excited": 0,
        "horror": 0
    }

    # 🎯 Goal-based scoring
    if goal == "feel good":
        scores["happy"] += 3
    if goal == "emotional":
        scores["sad"] += 3
    if goal == "thriller":
        scores["excited"] += 3
    if goal == "horror":
        scores["horror"] += 4

    # 😊 Feeling-based scoring
    if feeling == "happy":
        scores["happy"] += 2
    if feeling == "sad":
        scores["sad"] += 2
    if feeling == "angry":
        scores["angry"] += 2

    # ⚡ Energy-based scoring
    if energy == "high":
        scores["excited"] += 1
        scores["angry"] += 1
    if energy == "low":
        scores["relaxed"] += 1
        scores["sad"] += 1

    return max(scores, key=scores.get)