import { stompClient, subscribeToTopic } from "./websocket-client";

export const setupBlockListener = (
  currentUserId: number | undefined,
  onLogout: () => void
) => {
  if (!stompClient.connected) {
    console.error("WebSocket is not connected. Cannot setup block listener.");
    return;
  }

  subscribeToTopic(
    "/topic/logout",
    (payload: { userId: number | undefined }) => {
      if (payload.userId === currentUserId) {
        console.log("User has been blocked");
        onLogout();
      }
    }
  );
};
