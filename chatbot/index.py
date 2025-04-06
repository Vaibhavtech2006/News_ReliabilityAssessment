import pandas as pd
import nltk
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Download necessary NLTK data
nltk.download('punkt')

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load CSV dataset
try:
    df = pd.read_csv("C/Users/hp/OneDrive/Desktop/fake news/News-Reliability-System/chatbot/news_dataset.csv")  # Ensure this file exists
    df["Content"] = df["Content"].str.lower()  # Convert to lowercase for better matching
except FileNotFoundError:
    print("Error: news_dataset.csv file not found!")
    df = pd.DataFrame(columns=["Title", "Content", "Date"])  # Empty DataFrame fallback

# Ensure dataset is not empty
if df.empty:
    print("Warning: news dataset is empty!")

# TF-IDF Vectorization for similarity search
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df["Content"]) if not df.empty else None

def find_similar_articles(user_input, top_n=3):
    if tfidf_matrix is None:
        return []  # Return empty if no data

    input_vector = vectorizer.transform([user_input.lower()])
    similarities = cosine_similarity(input_vector, tfidf_matrix).flatten()
    
    top_indices = similarities.argsort()[-top_n:][::-1]  # Get top N similar articles
    results = df.iloc[top_indices][["Title", "Content", "Date"]].to_dict(orient="records")

    return results if results else [{"Title": "No Similar News Found", "Content": "Try another search!", "Date": "N/A"}]

@app.route('/get_news', methods=['POST'])
def get_news():
    try:
        data = request.get_json()
        user_input = data.get("article", "").strip()
        
        if not user_input:
            return jsonify({"error": "No article provided"}), 400

        related_articles = find_similar_articles(user_input)
        return jsonify({"related_news": related_articles})

    except Exception as e:
        print("Error processing request:", e)
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True)
