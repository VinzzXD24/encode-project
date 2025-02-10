import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.choices?.[0]?.message?.content || "Terjadi kesalahan.");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Chat AI</h1>
      <textarea 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        rows="4" 
        cols="50" 
      />
      <br />
      <button onClick={sendMessage}>Kirim</button>
      <p><strong>Respon:</strong> {response}</p>
    </div>
  );
}
