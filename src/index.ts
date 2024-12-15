import WebSocket, { WebSocketServer } from "ws";

// Map to store WebSocket connections for each room (key = roomId, value = array of sockets)
const websocketMap: Map<string, WebSocket[]> = new Map();

// Create WebSocket Server on port 8080
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("New client connected!");

  socket.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());

     
      if (parsedMessage.type === "join") {
        const roomId = parsedMessage.payload.roomId;

        // If room does not exist, create a new room and join
        if (!websocketMap.has(roomId)) {
          websocketMap.set(roomId, []);
          console.log(`Room ${roomId} created and client joined.`);
        }

        // Add client to the specified room
        websocketMap.get(roomId)?.push(socket);
        console.log(`Client joined room ${roomId}`);

        // Acknowledge successful room join
        console.log(`Successfully joined room ${roomId}.`)
        
      } else if (parsedMessage.type === "chat") {
        const { roomId, message: chatMessage } = parsedMessage.payload;

        // Broadcast the chat message to all clients in the room, except the sender
        const sockets = websocketMap.get(roomId);
        if (sockets) {
          sockets.forEach((clientSocket) => {
            if (clientSocket.readyState === WebSocket.OPEN && clientSocket !== socket) {
              clientSocket.send(
                JSON.stringify({
                  type: "chat",
                  payload: { roomId, message: chatMessage },
                })
              );
            }
          });
        }
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });

  // Handle client disconnect
  socket.on("close", () => {
    console.log("Client disconnected!");

    // Remove the socket from all rooms
    websocketMap.forEach((sockets, roomId) => {
      const updatedSockets = sockets.filter((s) => s !== socket);
      websocketMap.set(roomId, updatedSockets);

      // If the room is empty, delete the room
      if (updatedSockets.length === 0) {
        websocketMap.delete(roomId);
        console.log(`Room ${roomId} deleted.`);
      }
    });
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
