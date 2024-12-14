import { useState } from "react";
import { Button } from "../components/ui/button"; // Assuming Button component exists
import { Input } from "../components/ui/input"; // Assuming Input component exists

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");

  const handleJoinRoom = () => {
    // Logic for joining a room (e.g., navigate to the room or connect to WebSocket)
    console.log(`Joining room: ${roomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-4xl font-bold text-center mb-4">Join a Room</h2>
        <p className="text-xl text-center mb-6">Enter a room ID to join an existing room.</p>
        
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
            Don't have a room ID?{" "}
            <a href="/create" className="text-blue-600">Create a Room</a>
          </p>
        </div>
      </div>
    </div>
  );
}
