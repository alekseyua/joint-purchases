import type { IListOrderShotView } from "~/types/types.d";
import type { Route } from "./+types/MainContainer";
import Main from "./Main";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTelegram, type TelegramContextType, type TelegramWebApp } from "~/context/TelegramContext";
import { useWebSocket, type WebSocketContext } from "~/context/WebsocketContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Joint purchases" },
    { name: "description", content: "Welcome to joint purchases!" },
  ];
}

export default function MainContainer() {
  const [openOrder, setOpenOrder] = useState<number | null>(null);
  const [listOrder, setListOrder] = useState<IListOrderShotView[]>([]);
  const {webApp}: TelegramContextType = useTelegram();
  const {
    sendMessage,
    addMessageListener,
    removeMessageListener,
    isConnected,
  }: WebSocketContext = useWebSocket();

  useEffect(() => {
    const handleMessage = (data: any) => {
      const obj: {
        containers_data: IListOrderShotView[];
        message: string;
        type: string;
      } = JSON.parse(data);
      console.log("[Client] Получено сообщение:", obj);
      if(obj?.containers_data){
           setListOrder(obj.containers_data);
      }
    };

    addMessageListener(handleMessage);

    return () => {
      removeMessageListener(handleMessage);
    };
  }, [addMessageListener, removeMessageListener]);

  const handleOpenOrder = (id: number) => {
    if (openOrder === id) {
      return setOpenOrder(null);
    }
    setOpenOrder(id); 
  };
  console.log({ listOrder });
  return (
    <Main
      ListOrders={listOrder}
      openOrder={openOrder}
      handleOpenOrder={handleOpenOrder}
    />
  );
}
