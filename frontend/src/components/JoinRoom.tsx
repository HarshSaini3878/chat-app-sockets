import { useState } from "react";
import { Button } from "../components/ui/button"; // Assuming Button component exists
import { Input } from "../components/ui/input"; // Assuming Input component exists
import { Link, useNavigate } from "react-router-dom";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (!roomId.trim()) {
      setError("Please enter a room ID.");
      return;
    }

    
    const roomExists = true; 

    if (roomExists) {
      // Navigate to the chat room
      navigate(`/chat/${roomId}`);
    } else {
      setError("Room not found. Please check the room ID.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-4xl font-bold text-center mb-4">Join a Room</h2>
        <p className="text-xl text-center mb-6">Enter a room ID to join an existing room.</p>

        {/* Show error message if any */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Input for Room ID */}
        <Input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="mb-6"
        />

        {/* Button to Join the Room */}
        <Button onClick={handleJoinRoom} size="lg" className="w-full">
          Join Room
        </Button>

        {/* Link to Create Room page */}
        <div className="mt-4 text-center">
          <p>
            Don't have a room ID?{" "}
            <Link to="/create" className="text-blue-600">Create a Room</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
