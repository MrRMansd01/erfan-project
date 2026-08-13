const WEBSOCKET_URL = 'ws://10.0.0.15:8080/ws';

export type WebSocketMessageHandler = (message: string) => void;

export class RealtimeWebSocket {
  private socket: WebSocket | null = null;

  connect(onMessage?: WebSocketMessageHandler) {
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      return this.socket;
    }

    this.socket = new WebSocket(WEBSOCKET_URL);

    this.socket.onopen = () => {
      console.log('[WebSocket] Connected');
    };

    this.socket.onmessage = event => {
      console.log('[WebSocket] Incoming message:', event.data);
      onMessage?.(String(event.data));
    };

    this.socket.onerror = event => {
      console.log('[WebSocket] Error:', event);
    };

    this.socket.onclose = event => {
      console.log('[WebSocket] Closed:', event.code, event.reason);
      this.socket = null;
    };

    return this.socket;
  }

  send(payload: string | Record<string, unknown>) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.log('[WebSocket] Send skipped because the socket is not open');
      return;
    }

    const serialized =
      typeof payload === 'string' ? payload : JSON.stringify(payload);

    this.socket.send(serialized);
    console.log('[WebSocket] Outgoing message:', serialized);
  }

  disconnect() {
    if (!this.socket) {
      return;
    }

    this.socket.close();
    this.socket = null;
  }
}

export const websocketConfig = {
  url: WEBSOCKET_URL,
};
