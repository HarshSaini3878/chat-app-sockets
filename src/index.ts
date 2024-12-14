import WebSocket, { WebSocketServer } from "ws";

const websocketMap: Map<string, WebSocket[]> = new Map();
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("New client connected!");

  socket.on("message", (message) => {
    try {
      const ParsedMessage = JSON.parse(message.toString());

      if (ParsedMessage.type === "join") {
        const roomId = ParsedMessage.payload.roomId;

        // Check if the room already exists in the map
        if (!websocketMap.has(roomId)) {
          websocketMap.set(roomId, []); // Initialize with an empty array
        }

        // Add the socket to the room
        websocketMap.get(roomId)?.push(socket);
        console.log(`Socket added to room ${roomId}`);
      } else if (ParsedMessage.type === "chat") {
        const roomId = ParsedMessage.payload.roomId;
        const chatMessage = ParsedMessage.payload.message;

        // Broadcast the message to all sockets in the room
        const sockets = websocketMap.get(roomId);
        if (sockets) {
          sockets.forEach((clientSocket) => {
            if (clientSocket.readyState === WebSocket.OPEN) {
              clientSocket.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    roomId,
                    message: chatMessage,
                  },
                })
              );
            }
          });
        } else {
          console.log(`Room ${roomId} not found.`);
        }
      } else {
        console.log(`Unhandled message type: ${ParsedMessage.type}`);
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected!");

    // Remove socket from all rooms
    websocketMap.forEach((sockets, roomId) => {
      websocketMap.set(
        roomId,
        sockets.filter((s) => s !== socket)
      );

      // If the room becomes empty, you can delete it
      if (websocketMap.get(roomId)?.length === 0) {
        websocketMap.delete(roomId);
        console.log(`Room ${roomId} deleted as it became empty.`);
      }
    });
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
