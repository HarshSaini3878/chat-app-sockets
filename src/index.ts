// server.js
import WebSocket, { WebSocketServer } from "ws";

const websocketMap: Map<string, WebSocket[]> = new Map(); // Rooms map
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("New client connected!");

  socket.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());

      if (parsedMessage.type === "create") {
        const roomId = parsedMessage.payload.roomId;

        // Create a new room if it doesn't exist
        if (!websocketMap.has(roomId)) {
          websocketMap.set(roomId, []);
          console.log(`Room ${roomId} created.`);
        }
      } else if (parsedMessage.type === "join") {
        const roomId = parsedMessage.payload.roomId;

        if (!websocketMap.has(roomId)) {
          console.error(`Room ${roomId} does not exist.`);
          socket.send(
            JSON.stringify({
              type: "error",
              payload: { message: `Room ${roomId} does not exist.` },
            })
          );
          return;
        }

        // Add client to the room
        websocketMap.get(roomId)?.push(socket);
        console.log(`Client joined room ${roomId}`);
      } else if (parsedMessage.type === "chat") {
        const { roomId, message: chatMessage } = parsedMessage.payload;

        // Broadcast the message to all sockets in the room except the sender
        const sockets = websocketMap.get(roomId);
        if (sockets) {
          sockets.forEach((clientSocket) => {
            if (
              clientSocket.readyState === WebSocket.OPEN &&
              clientSocket !== socket
            ) {
              clientSocket.send(
                JSON.stringify({
                  type: "chat",
                  payload: { roomId, message: chatMessage },
                })
              );
            }
          });
        } else {
          console.log(`Room ${roomId} not found.`);
        }
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected!");

    // Remove client from all rooms
    websocketMap.forEach((sockets, roomId) => {
      const updatedSockets = sockets.filter((s) => s !== socket);
      websocketMap.set(roomId, updatedSockets);

      // Delete room if it's empty
      if (updatedSockets.length === 0) {
        websocketMap.delete(roomId);
        console.log(`Room ${roomId} deleted.`);
      }
    });
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
