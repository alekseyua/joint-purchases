declare global {
  interface Window {
    Telegram: TelegramWebApp;
  }
}

interface IStatusDelivery {
  color: string;
  name: string;
}
interface IProductsOrder {
  id: number;
  name: string;
  status: IStatusDelivery;
  product_image: string;
  status_payment: boolean;
  status_delivery: boolean;
}
interface IListOrderShotView {
  id: number;
  image: string;
  name: string;
  status: IStatusDelivery;
  address: string;
  shipment_date: string;
  products: IProductsOrder[];
}

interface IButtons {
  name: string;
  action: string;
  href?: string;
  style: variantsButton;
}
interface INotification {
  title: string;
  description: string;
  status: "read" | "unread";
  buttons: IButtons[];
}
interface ISupport {
  title: string;
  description: string;
  avatar: string;
  buttons: IButtons[];
}

export {
  IListOrderShotView,
  IStatusDelivery,
  IProductsOrder,
  INotification,
  ISupport,
  IButtons,
};
