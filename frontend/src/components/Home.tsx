import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <main className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">ChatBot Hub</h1>
        <p className="text-xl mb-8 max-w-md mx-auto">
          Connect, collaborate, and chat in real-time. Join existing rooms or create your own space.
        </p>
        
        {/* Chatbox Section */}
        <div className="w-full max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-4">Live Chat</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="bg-gray-200 p-3 rounded-lg max-w-[80%]">
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-gray-600">Hello, how can I assist you today?</p>
                <span className="text-xs text-gray-500">12:30 PM</span>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 justify-end">
              <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                <p className="font-semibold">You</p>
                <p className="text-sm">I need help with my account.</p>
                <span className="text-xs text-gray-400">12:32 PM</span>
              </div>
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="space-x-4 mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/join">Join Room</Link>
          </Button>
          <Button asChild size="lg">
            <Link to="/create">Create Room</Link>
          </Button>
        </div>
      </main>
      
      <footer className="mt-16 text-sm text-gray-500">
        © 2023 ChatBot Hub. All rights reserved.
      </footer>
    </div>
  );
}
