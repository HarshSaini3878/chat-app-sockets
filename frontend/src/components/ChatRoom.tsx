'use client'

import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from 'lucide-react'
import { motion } from "framer-motion"

export default function ChatRoom() {
  const { roomId } = useParams<{ roomId: string }>()
  const wsref = useRef<WebSocket | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // WebSocket message handler
  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8080")
    wsref.current = websocket
    websocket.onopen = () => {
      console.log("Connected to WebSocket")
      websocket.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomId,
          },
        })
      )
    }
    websocket.onclose = () => console.log("Disconnected from WebSocket")
    websocket.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data)
      console.log("Received message: ", incomingMessage)
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "received", message: incomingMessage.payload?.message || "No message" },
      ])
    }

    return () => {
      if (wsref.current) {
        wsref.current.close()
      }
    }
  }, [roomId])

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (wsref.current && message) {
      wsref.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            roomId: roomId,
            message: message,
          },
        })
      )
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "sent", message: message },
      ])
      setMessage("") // Clear input after sending
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault() // Prevent the default "Enter" key behavior (e.g., form submission)
      handleSendMessage() // Trigger send message
    }
  }

  return (
    <Card className="flex flex-col h-screen border-none">
      <CardHeader className="border-b bg-gray-800 text-white">
        <CardTitle className="text-xl font-semibold">Chat Room: {roomId}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 bg-gray-100 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <motion.div className="space-y-4" initial="initial" animate="animate" exit="exit">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-end space-x-2 max-w-[75%]">
                  {msg.type === "received" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                  <motion.div
                    className={`p-3 rounded-lg text-sm leading-6 max-w-full break-words ${msg.type === "sent"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-300 text-black"}`}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {msg.message}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t bg-white p-4 shadow-lg">
        <form onSubmit={(e) => e.preventDefault()} className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 rounded-lg border focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" size="icon" onClick={handleSendMessage} className="p-2 rounded-lg bg-primary text-white">
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
