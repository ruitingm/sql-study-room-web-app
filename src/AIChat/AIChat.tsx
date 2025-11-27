import { useState, useEffect, useRef } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { sender: "user", text: "Hello there!" },
    { sender: "ai", text: "Hi, How can I help you?" },
    { sender: "user", text: "Give me a SQL question using JOIN." },
    {
      sender: "ai",
      text: `Tables:

customers
customer_id | name | city
1 | Alice | New York
2 | Bob | Chicago
3 | Charlie | Los Angeles

orders
order_id | customer_id | order_date | total_amount
101 | 1 | 2024-06-15 | 150.00
102 | 2 | 2024-07-01 | 200.00
103 | 1 | 2024-07-10 | 300.00
104 | 3 | 2024-07-11 | 250.00

Question:
Write a SQL query to list all customers and their total amount spent, including customers who haven’t placed any orders yet.`,
    },
  ]);

  const model = "GPT";
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // try {
    //   const res = await fetch("http://localhost:8000/chat", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ message: input }),
    //   });
    //   const data = await res.json();
    //   setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    // } catch (error) {
    //   setMessages((prev) => [
    //     ...prev,
    //     { sender: "bot", text: "Error connecting to server." },
    //   ]);
    // }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-full rounded-xl bg-stone-100 shadow-lg">
      <div className="bg-neutral-400 text-stone-800 text-center py-4 font-semibold text-xl rounded-t-xl">
        {model} Chat Assistant
      </div>
      <div className="flex-1 overflow-y-auto p-6 flex flex-col space-y-3 bg-stone-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-2 rounded-xl text-md ${
              msg.sender === "user"
                ? "bg-neutral-600 text-stone-50 self-end rounded-br-none"
                : "bg-stone-200 text-stone-800 self-start rounded-bl-none"
            }`}
          >
            {msg.sender == "ai" && (
              <pre className="text-md font-sans whitespace-pre-wrap">
                {msg.text}
              </pre>
            )}
            {msg.sender == "user" && <div>{msg.text}</div>}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="border-t border-gray-300 p-4 bg-stone-50 flex items-center rounded-bl-xl rounded-br-xl">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-md focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-sky-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-sky-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
