import { useEffect, useRef, useState } from "react";

function Basic() {
  const wsref = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]); // This will store all messages

  useEffect(() => {
    const wss = new WebSocket("ws://localhost:8080");
    wsref.current = wss;

    // Send a "join" request when connecting to the WebSocket server
    wss.onopen = () => {
      console.log("Connected to WebSocket");
      wss.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };

    wss.onclose = () => console.log("Disconnected from WebSocket");

    // Handle incoming messages
    wss.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      console.log("Received message: ", incomingMessage); // Log the full message to check the structure
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "received", message: incomingMessage.payload?.message || "No message" },
      ]);
    };
  }, []);

  const handleSendMessage = () => {
    if (wsref.current && message) {
      // Send the message via WebSocket
      wsref.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            roomId: "red",
            message: message,
          },
        })
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "sent", message: message },
      ]);
      setMessage(""); // Clear input after sending
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default "Enter" key behavior (e.g., form submission)
      handleSendMessage(); // Trigger send message
    }
  };
  console.log(messages); // Log the messages array to check if it's being updated

  return (
    <div className="bg-black flex items-center justify-center w-screen h-screen">
      <div className="w-[400px] h-[600px] flex flex-col bg-white rounded-lg shadow-xl overflow-hidden">
        
        {/* Chatbox Header */}
        <div className="flex justify-between items-center p-4 bg-black text-white">
          <h2 className="font-semibold text-lg">Chat</h2>
          <button className="bg-gray-600 p-2 rounded-full text-white">X</button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.type === "sent" ? "bg-black text-white" : "bg-gray-100 text-black"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No messages yet</div>
          )}
        </div>

        {/* Input Section */}
        <div className="flex items-center p-4 bg-gray-100">
          <input
            type="text"
            className="w-full p-3 bg-white text-black border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Type a message..."
            value={message}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="ml-3 p-3 bg-black rounded-full text-white hover:bg-gray-700"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Basic;
