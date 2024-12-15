import { useState } from "react";
import { Button } from "../components/ui/button"; // Assuming Button component exists
import { Input } from "../components/ui/input"; // Assuming Input component exists
import { Link, useNavigate } from "react-router-dom"; // React Router v6

export default function CreateRoom() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate(); // for navigation

  const handleJoinRoom = () => {
    if (!roomId.trim()) {
      alert("Please enter a valid room ID");
      return;
    }

    // Navigate to the room with the entered room ID
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-4xl font-bold text-center mb-4">Enter Room ID</h2>
        <p className="text-xl text-center mb-6">Enter the room ID to join an existing room.</p>
        
        <Input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="mb-6"
        />
        
        <Button onClick={handleJoinRoom} size="lg" className="w-full">
          Join Room
        </Button>
        
        <div className="mt-4 text-center">
          <p>
            Don't have a room?{" "}
            <Link to="/create" className="text-blue-600">Create a New Room</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
