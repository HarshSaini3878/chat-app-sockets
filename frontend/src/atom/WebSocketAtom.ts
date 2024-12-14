// atoms/websocketAtom.ts
import { atom } from "recoil";

export const websocketAtom = atom<WebSocket | null>({
  key: "websocketAtom", 
  default: null, 
});
