"use client";

import React, { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import chatbotApiRequest from "../apiRequests/chatbot";

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<
        { text: string; sender: "user" | "bot" }[]
    >([{ text: "Hello! How can I help you today?", sender: "bot" }]);
    const [input, setInput] = useState("");
    const [isWaiting, setIsWaiting] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        // Thêm tin nhắn người dùng
        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        setInput("");
        setIsWaiting(true);

        try {
            // Gọi API chatbot
            const response = await chatbotApiRequest.getChatbotData({
                message: input,
            });

            // Thêm phản hồi từ bot
            setMessages((prev) => [
                ...prev,
                { text: response.message, sender: "bot" },
            ]);
        } catch (error: any) {
            console.error("Chatbot API Error:", error);

            // Thêm thông báo lỗi
            setMessages((prev) => [
                ...prev,
                {
                    text: "Sorry, something went wrong. Please try again later.",
                    sender: "bot",
                },
            ]);
        } finally {
            setIsWaiting(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {isOpen ? (
                <Card className="w-80 h-[500px] shadow-lg flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center space-x-2">
                            <MessageSquare className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-semibold">Chat Support</h2>
                        </div>
                        <Button variant="ghost" size="icon" onClick={toggleChat}>
                            <X className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-hidden p-0">
                        <ScrollArea className="h-full p-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"
                                        }`}
                                >
                                    <div
                                        className={`inline-block p-3 rounded-lg ${message.sender === "user"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                            {isWaiting && (
                                <div className="text-muted text-sm text-left">
                                    Bot is typing...
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                            className="flex w-full items-center space-x-2"
                        >
                            <Input
                                type="text"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isWaiting}
                            />
                            <Button type="submit" size="icon" disabled={isWaiting}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            ) : (
                <Button
                    onClick={toggleChat}
                    className="rounded-full w-12 h-12 shadow-lg"
                >
                    <MessageSquare className="w-6 h-6" />
                </Button>
            )}
        </div>
    );
};

export default ChatWidget;
