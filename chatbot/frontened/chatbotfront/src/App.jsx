import React, { useState } from "react";

const NewsChatbot = () => {
  const [news, setNews] = useState("");
  const [responses, setResponses] = useState([]);

  const sendNews = async () => {
    if (!news.trim()) return;

    const userMessage = { text: news, sender: "user" };
    setResponses((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/get_news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article: news }),
      });

      const data = await response.json();
      const botResponse = {
        text: data.related_news.map((newsItem) => 
          `📢 ${newsItem.Title} - ${newsItem.Date}\n${newsItem.Content}`
        ).join("\n\n"),
        sender: "bot",
      };

      setResponses((prev) => [...prev, botResponse]);
    } catch (error) {
      setResponses((prev) => [...prev, { text: "Error fetching news. Try again!", sender: "bot" }]);
    }

    setNews("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold text-center mb-4">📰 News Chatbot</h1>
        <div className="h-96 overflow-y-auto border p-3 rounded bg-gray-50">
          {responses.map((msg, index) => (
            <div key={index} className={`my-2 p-2 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-300 text-black self-start mr-auto"}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={news}
            onChange={(e) => setNews(e.target.value)}
            placeholder="Write your news article..."
            className="flex-1 p-2 border rounded-l focus:outline-none"
          />
          <button onClick={sendNews} className="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsChatbot;
