import type { IListOrderShotView } from "~/types/types.d";
import type { Route } from "./+types/MainContainer";
import Main from "./Main";
import { useEffect, useState } from "react";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Joint purchases" },
    { name: "description", content: "Welcome to joint purchases!" },
  ];
}

export default function MainContainer() {
  const [openOrder, setOpenOrder] = useState<number | null>(null);
  const [listOrder, setListOrder] = useState<IListOrderShotView[]>([]);
  const fakeListOrder: IListOrderShotView[] = [
    {
      id: 1,
      image: "",
      name: "Контейнер №1",
      status: {
        color: "#BC7400",
        name: "На таможне ",
      },
      address: "г. Краснодар ул. Ленина дом 7",
      shipment_date: "~01.09.2025",
      products: [
        {
          id: 0,
          name: "Агрегат",
          status: {
            color: "#10BC00",
            name: "Товар куплен в Эмиратах",
          },
          product_image: "",
          status_payment: false,
          status_delivery: false,
        },
      ],
    },
    {
      id: 2,
      image: "",
      name: "Контейнер №4",
      status: {
        color: "#10BC00",
        name: "В пути",
      },
      address: "г. Краснодар ул. Ленина дом 7",
      shipment_date: "~01.09.2025",
      products: [
        {
          id: 0,
          name: "Агрегат",
          status: {
            color: "#10BC00",
            name: "Товар куплен в Эмиратах",
          },
          product_image: "",
          status_payment: true,
          status_delivery: false,
        },
        {
          id: 1,
          name: "Кузовной элемент",
          status: {
            color: "#0077BC",
            name: "Товар в России - к отгрузке",
          },
          product_image: "",
          status_payment: false,
          status_delivery: true,
        },
      ],
    },
    {
      id: 3,
      image: "",
      name: "Контейнер №3",
      status: {
        color: "#707579",
        name: "Контейнер отгружен",
      },
      address: "г. Краснодар ул. Ленина дом 7",
      shipment_date: "~01.09.2025",
      products: [
        {
          id: 0,
          name: "",
          status: {
            color: "",
            name: "",
          },
          product_image: "",
          status_payment: false,
          status_delivery: false,
        },
      ],
    },
  ];

  //
   useEffect(() => {
     const getFetchData = async function () {
       try {
         const url = "https://botrazbor.ru/lk/api_get_containers/?telegram_id=1649083487";
         const res = await axios.get(url);
         console.log(res);
         if (res.status === 200) {
          const result:IListOrderShotView[] = res.data.info.message; 
          setListOrder(result)
         } else {
           const err = new Error("catch error request " + url);
           console.log(err);
         }
       } catch (error) {
         console.log((error as Error).message);
       }
     };
     getFetchData();
   }, []);

  const handleOpenOrder = (id: number) => {
    if (openOrder === id) {
      return setOpenOrder(null);
    }
    setOpenOrder(id);
  };
  return (
    <Main
      ListOrders={listOrder}
      openOrder={openOrder}
      handleOpenOrder={handleOpenOrder}
    />
  );
}
