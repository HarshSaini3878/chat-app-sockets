import { useState } from "react";
import { Button } from "../components/ui/button"; // Assuming Button component exists
import { Input } from "../components/ui/input"; // Assuming Input component exists

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = () => {
    // Logic for creating a room (e.g., create a room ID, navigate to the room or initialize WebSocket)
    console.log(`Creating room: ${roomName}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-black">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-4xl font-bold text-center mb-4">Create a Room</h2>
        <p className="text-xl text-center mb-6">Enter a name for your new room.</p>
        
        <Input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="mb-6"
        />
        
        <Button onClick={handleCreateRoom} size="lg" className="w-full">
          Create Room
        </Button>
        
        <div className="mt-4 text-center">
          <p>
            Already have a room?{" "}
            <a href="/join" className="text-blue-600">Join a Room</a>
          </p>
        </div>
      </div>
    </div>
  );
}
