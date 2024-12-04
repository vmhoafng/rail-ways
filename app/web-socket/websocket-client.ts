let ws: WebSocket | null = null;

export const activateWebSocket = (
  accessToken: string,
  onLogout: () => void
) => {
  if (ws) {
    console.warn("WebSocket is already connected.");
    return;
  }

  ws = new WebSocket(
    `${process.env.NEXT_PUBLIC_WS_URL}/websocket/auth?token=${accessToken}`
  );

  ws.onopen = () => {
    console.log("WebSocket connected");
  };

  ws.onmessage = (event) => {
    console.log("Received message:", event);

    const message = event.data;
    console.log("Message received:", message);

    if (message === "logout") {
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
