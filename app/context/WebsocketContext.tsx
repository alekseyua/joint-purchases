import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useReducer,
  type ReactNode,
} from "react";
import { useTelegram, type TelegramContextType } from "./TelegramContext";
import {
  webSocketReducer,
  initialWebSocketState,
} from "../reducers/websocket.reducer";
import type {
  WebSocketState,
  WebSocketAction,
} from "../types/websocket.reducer";

interface IPropsProvider {
  children: ReactNode;
}

type MessageHandler = (data: any) => void;

export interface WebSocketContextType {
  sendMessage: (msg: string) => void;
  addMessageListener: (fn: MessageHandler) => void;
  removeMessageListener: (fn: MessageHandler) => void;
  isConnected: boolean;
  state: WebSocketState;
  dispatch: React.Dispatch<WebSocketAction>;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<IPropsProvider> = ({ children }) => {
  const customIDTelegram = ''; //320515824; //6446175339
  const { webApp }: TelegramContextType = useTelegram();
  const WEBSOCKET_URL = "wss://botrazbor.ru/ws/lk/";
  const RECONNECT_INTERVAL_MS = 3000;
  const PING_INTERVAL_MS = 15000;

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messageQueue = useRef<string[]>([]);
  const listeners = useRef<Set<MessageHandler>>(new Set());

  const [isConnected, setIsConnected] = useState(false);

  // ✅ Добавляем useReducer
  const [state, dispatch] = useReducer(webSocketReducer, initialWebSocketState);

  const clearPing = () => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
  };

  const connect = useCallback((id: number) => {
    const socket = new WebSocket(`${WEBSOCKET_URL}?telegram_id=${id}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("[WebSocket] Connected");
      setIsConnected(true);

      // clearPing();
      // pingIntervalRef.current = setInterval(() => {
      //   if (socket.readyState === WebSocket.OPEN) {
      //     socket.send(JSON.stringify({ type: "ping1" }));
      //   }
      // }, PING_INTERVAL_MS);

      while (messageQueue.current.length > 0) {
        const msg = messageQueue.current.shift();
        if (msg) socket.send(msg);
      }
    };

    socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        dispatch({ type: "ADD_MESSAGE", payload: parsed });

        // Дополнительно — уведомим сторонние подписки
        // listeners.current.forEach((fn) => fn(parsed));
      } catch (e) {
        console.warn("Invalid message format:", event.data);
      }
    };

    socket.onclose = () => {
      console.warn("[WebSocket] Disconnected. Reconnecting...");
      setIsConnected(false);
      clearPing();
      // reconnect();
    };

    socket.onerror = (error) => {
      console.error("[WebSocket] Error:", error);
      clearPing();
      socket.close();
    };
  }, []);

  const reconnect = useCallback(() => {
    if (reconnectTimeout.current) return;

    reconnectTimeout.current = setTimeout(() => {
      reconnectTimeout.current = null;
      const id = webApp?.initDataUnsafe?.user?.id ?? customIDTelegram;
      if (id) connect(id);
    }, RECONNECT_INTERVAL_MS);
  }, [connect, webApp]);

  const sendMessage = useCallback((msg: string) => {
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
    } else {
      console.warn("[WebSocket] Not connected, buffering message...");
      messageQueue.current.push(msg);
    }
  }, []);

  const addMessageListener = useCallback((fn: MessageHandler) => {
    listeners.current.add(fn);
  }, []);

  const removeMessageListener = useCallback((fn: MessageHandler) => {
    listeners.current.delete(fn);
  }, []);

  useEffect(() => {
    const id = webApp?.initDataUnsafe?.user?.id ?? customIDTelegram;
    if (!id) return;

    connect(id);

    return () => {
      socketRef.current?.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      clearPing();
    };
  }, [connect, webApp]);

  return (
    <WebSocketContext.Provider
      value={{
        sendMessage,
        addMessageListener,
        removeMessageListener,
        isConnected,
        state,
        dispatch,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
