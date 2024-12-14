import WebSocket,{WebSocketServer} from "ws";



const wss= new WebSocketServer({port:8080});
let allSockets:WebSocket[]=[]
wss.on("connection",(socket)=>{
    allSockets.push(socket);
    socket.on("message",(message)=>{
        allSockets.forEach((s)=>{
          if(s!==socket)s.send(message.toString()+":from server")
        })
       
    })
})