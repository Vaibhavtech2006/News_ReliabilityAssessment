from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import re
import string
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests from React

# Load and preprocess dataset
data_fake = pd.read_csv(r'C:/Users/hp/OneDrive/Desktop/fake news/New folder (2)/Fake .csv')
data_true = pd.read_csv(r'C:/Users/hp/OneDrive/Desktop/fake news/New folder (2)/True.csv')

data_fake['class'] = 0  # Label fake news as 0
data_true['class'] = 1  # Label true news as 1
data_combined = pd.concat([data_fake, data_true])

def preprocess_text(text):
    text = text.lower()
    text = re.sub(f'[{re.escape(string.punctuation)}]', '', text)
    return text

data_combined['text'] = data_combined['text'].apply(preprocess_text)

X = data_combined['text']
y = data_combined['class']

vectorizer = CountVectorizer()
X_vectorized = vectorizer.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_vectorized, y, test_size=0.2, random_state=42)

# Train the model
model = MultinomialNB()
model.fit(X_train, y_train)

@app.route('/analyze', methods=['POST'])
def analyze_news():
    data = request.json  # Get JSON payload
    news_text = data.get("content", "")  # Extract content field

    if not news_text.strip():
        return jsonify({"error": "No content provided"}), 400

    processed_text = preprocess_text(news_text)
    vectorized_text = vectorizer.transform([processed_text])
    prediction = model.predict(vectorized_text)
    
    result = "FAKE" if prediction[0] == 0 else "REAL"
    return jsonify({"result": result})  # Return the result

if __name__ == "__main__":
    app.run(debug=True)  # Run Flask app
