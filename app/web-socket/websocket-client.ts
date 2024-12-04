let ws: WebSocket | null = null;

export const activateWebSocket = (
  accessToken: string,
  onLogout: () => void
) => {
  if (ws) {
    console.warn("WebSocket is already connected.");
    return;
  }

  ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/websocket/auth`);

  ws.onopen = () => {
    console.log("WebSocket connected");
    ws?.send(JSON.stringify({ type: "authenticate", token: accessToken }));
  };

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("Message received:", message);

    if (message.type === "logout") {
      console.log("Received logout message.");
      onLogout();
    }
  };

  ws.onclose = () => {
    console.log("WebSocket disconnected");
    ws = null;
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
};

export const deactivateWebSocket = () => {
  if (ws) {
    ws.close();
    ws = null;
    console.log("WebSocket deactivated");
  }
};
