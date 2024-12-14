// hooks/useWebSocket.ts
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { websocketAtom } from "../atom/WebSocketAtom";

export const useWebSocket = (url: string) => {
  const [websocket, setWebSocket] = useRecoilState(websocketAtom);

  useEffect(() => {
    if (!websocket) {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setWebSocket(null);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setWebSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [websocket, setWebSocket, url]);

  return websocket;
};
