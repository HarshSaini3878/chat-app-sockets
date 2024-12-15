import { useState, useEffect } from "react";

// Custom hook to manage WebSocket connection
export function useWebSocket(url: string) {
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Create a WebSocket connection
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connection established.");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWebSocket(ws);

    // Cleanup on unmount or when the url changes
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [url]);

  return websocket;
}
