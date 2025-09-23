import type { IListOrderShotView } from "~/types/types.d";
import type { Route } from "./+types/MainContainer";
import Main from "./Main";
import { useEffect, useState } from "react";
import { useTelegram, type TelegramContextType } from "~/context/TelegramContext";
import { useWebSocket, type WebSocketContextType } from "~/context/WebsocketContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Joint purchases" },
    { name: "description", content: "Welcome to joint purchases!" },
  ];
}

export default function MainContainer() {
  const [openOrder, setOpenOrder] = useState<number | null>(null);
  const [listOrder, setListOrder] = useState<IListOrderShotView[]>([]);
  const {
    sendMessage,
    addMessageListener,
    removeMessageListener,
    isConnected,
    state,
  }: WebSocketContextType = useWebSocket();

  // useEffect(() => {
  //   const handleMessage = (data: any) => {
  //     const obj: {
  //       containers_data: IListOrderShotView[];
  //       message: string;
  //       type: string;
  //     } = JSON.parse(data);
  //     console.log("[Client] Получено сообщение:", obj);
  //     if (obj?.containers_data) {
  //       setListOrder(obj.containers_data);
  //     }
  //   };

  //   addMessageListener(handleMessage);

  //   return () => {
  //     removeMessageListener(handleMessage);
  //   };
  // }, [addMessageListener, removeMessageListener]);

  useEffect(() => {
    if(state?.lastMessage?.containers_data?.length){
      setListOrder(state.lastMessage.containers_data)    
    }else{
      setListOrder([])    
    }
  }, [state.lastMessage]);
  const handleOpenOrder = (id: number) => {
    if (openOrder === id) {
      return setOpenOrder(null);
    }
    setOpenOrder(id);
  };
  // console.log({ listOrder });
  // console.log(state.lastMessage); // последняя полученная
  // console.log(state.messages); // массив всех полученных


 

  return (
    <Main
      ListOrders={listOrder}
      openOrder={openOrder}
      handleOpenOrder={handleOpenOrder}
    />
  );
}
