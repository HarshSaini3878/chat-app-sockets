import { useState } from "react";
import { useRecoilValue } from "recoil";
import { websocketAtom } from "../atom/WebSocketAtom";

export default function ChatRoom({ roomId }: { roomId: string }) {
  const websocket = useRecoilValue(websocketAtom);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (websocket?.readyState === WebSocket.OPEN) {
      websocket.send(
        JSON.stringify({
          type: "chat",
          payload: { roomId, message },
        })
      );
      setMessage("");
    }
  };

  // Listen for incoming messages
  if (websocket) {
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat" && data.payload.roomId === roomId) {
        setMessages((prev) => [...prev, data.payload.message]);
      }
    };
  }

  return (
    <div>
      <h1>Room ID: {roomId}</h1>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="border p-2"
      />
      <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-500 text-white">
        Send
      </button>
    </div>
  );
}
