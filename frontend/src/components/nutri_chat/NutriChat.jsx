import { useState, useRef, useEffect } from "react";
import "./NutriChat.css";
import SendButton from "../SendButton";
import ChatInput from "./ChatInput";

const NutriChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Nutri Chat 🤖. Ask me anything about nutrition.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    // Add user message to UI
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: userText, sender: "user" },
    ]);

    setInput("");

    try {
      // Convert UI messages to API format
      const apiMessages = [{ role: "user", content: userText }];

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error("Chat API failed");
      }

      const data = await response.json();

      // Add bot reply to UI
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.reply,
          sender: "bot",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "Sorry, I couldn’t reply right now 😕",
          sender: "bot",
        },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-page">
      <header className="chat-header">Nutri Chat</header>

      <div className="chat-messages">
        {messages.map((msg) => (
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
        <ChatInput 
          placeholder="Ask about calories, protein, diet..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <SendButton
          onClick={sendMessage}
          disabled={!input.trim()}
          label="Send"
        />
      </div>
    </div>
  );
};

export default NutriChat;
