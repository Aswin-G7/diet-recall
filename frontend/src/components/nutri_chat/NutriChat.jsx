import { useState, useRef, useEffect } from "react";
import "./NutriChat.css";

const NutriChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Nutri Chat 🤖. Ask me anything about nutrition.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user"
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Mock bot reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks for your question! Nutrition advice coming soon 😊",
          sender: "bot"
        }
      ]);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-page">
      <header className="chat-header">Nutri Chat</header>

      <div className="chat-messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`message-row ${msg.sender === "user" ? "user" : "bot"}`}
          >
            <div className="message-bubble" dir="auto">
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask about calories, protein, diet..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default NutriChat;
