import { createContext, useCallback, useContext, useEffect, useRef, useState, type RefObject } from "react";
import { useTelegram, type TelegramContextType } from "./TelegramContext";



interface IPropsProvider {
    children: React.ReactNode;
}
type MessageHandler = (data: any) => void;

export interface WebSocketContext {
  sendMessage: (msg: string) => void;
  addMessageListener: (fn: MessageHandler) => void;
  removeMessageListener: (fn: MessageHandler) => void;
  isConnected: boolean;
} 
//RefObject<WebSocket | null>;
const WebSocketContext = createContext<WebSocketContext | null>(null);

export const WebSocketProvider:React.FC<IPropsProvider> = ({children, ...props}) => {
    const { webApp }: TelegramContextType = useTelegram();
    const WEBSOCKET_URL = 'wss://botrazbor.ru/ws/lk/';
    const RECONNECT_INTERVAL_MS = 3000;
    const socketRef = useRef<WebSocket | null>(null);
    const messageQueue = useRef<string[]>([]);
    const listeners = useRef<Set<MessageHandler>>(new Set());

    const [isConnected, setIsConnected] = useState  (false);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

    const connect = useCallback((id:number) => {
      console.log({id},webApp?.initDataUnsafe);
      const socket = new WebSocket(WEBSOCKET_URL + `?telegram_id=${id}`);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("[WebSocket] Connected");
        setIsConnected(true);

        // Отправляем накопленные сообщения
        while (messageQueue.current.length > 0) {
          const msg = messageQueue.current.shift();
          if (msg) socket.send(msg);
        }
      };

      socket.onmessage = (event) => {
        for (const handler of listeners.current) {
          handler(event.data);
        }
      };

      socket.onclose = () => {
        console.warn("[WebSocket] Disconnected. Reconnecting...");
        setIsConnected(false);
        reconnect();
      };

      socket.onerror = (error) => {
        console.error("[WebSocket] Error:", error);
        socket.close(); // Закрыть и инициировать реконнект
      };
    }, []);

    const reconnect = useCallback(() => {
      if (reconnectTimeout.current && !!webApp?.initDataUnsafe.user.id) return;

      reconnectTimeout.current = setTimeout(() => {
        reconnectTimeout.current = null;
        connect(webApp?.initDataUnsafe.user.id);
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
      const id = webApp?.initDataUnsafe.user.id //?? 6446175339;
      if (!!!id) return;
      connect(id);

      return () => {
        socketRef.current?.close();
        if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      };
    }, [connect, reconnect, webApp]);

    return (
      <WebSocketContext.Provider
        value={{
          sendMessage,
          addMessageListener,
          removeMessageListener,
          isConnected,
        }}
      >
        {children}
      </WebSocketContext.Provider>
    );
}

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if(!context){
        throw new Error('Context websocket not available, must use into Websocket Provider')
    }
    return context
}