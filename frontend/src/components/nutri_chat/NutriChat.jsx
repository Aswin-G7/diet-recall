import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';

const NutriChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Nutri Chat 🤖. Ask me anything about nutrition.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");
    setIsLoading(true);

    // Add user message to UI
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: userText, sender: "user" },
    ]);

    try {
      const token = localStorage.getItem("token"); // 🚨 GET TOKEN

      const apiMessages = [{ role: "user", content: userText }];

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // 🚨 SEND TOKEN
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) throw new Error("Chat API failed");

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] overflow-hidden my-8">
      {/* Premium Header */}
      <div className="bg-emerald-600 p-6 text-white flex items-center gap-4">
        <div className="bg-white/20 p-2 rounded-xl">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-xl">Nutri AI Coach</h2>
          <p className="text-xs text-emerald-100">Online & ready to help</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
              msg.sender === 'user' ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-600 border border-slate-100'
            }`}>
              {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            
            {/* Bubble */}
            <div className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-emerald-500 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading Animation */}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center border border-slate-100">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
            </div>
            <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about your diet, recipes, or goals..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-emerald-100"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NutriChat;