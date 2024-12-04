import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const socket = new SockJS(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/websocket/auth`
);

export const stompClient = new Client({
  webSocketFactory: () => socket,
  reconnectDelay: 5000,
  debug: (str) => console.log(str),
  onConnect: () => {
    console.log("WebSocket connected.");
  },
  onDisconnect: () => {
    console.log("WebSocket disconnected.");
  },
  onStompError: (frame) => {
    console.error("Broker error: " + frame.headers["message"]);
    console.error("Details: " + frame.body);
  },
});

export const connectWebSocket = () => {
  if (!stompClient.connected) {
    stompClient.activate();
  }
};

export const disconnectWebSocket = () => {
  if (stompClient.connected) {
    stompClient.deactivate();
  }
};

export const subscribeToTopic = (
  topic: string,
  callback: (message: any) => void
) => {
  if (!stompClient.connected) {
    console.error("WebSocket is not connected. Subscription failed.");
    return;
  }

  stompClient.subscribe(topic, (message) => {
    const payload = JSON.parse(message.body);
    callback(payload);
  });
};
