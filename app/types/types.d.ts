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
  // status: IStatusDelivery;
  // product_image: string;
  // status_payment: boolean;
  // status_delivery: boolean;
  weight: number;
  product_sum: number;
  product_type: string;
}
interface IListOrderShotView {
  id: number;
  image: string | null;
  name: string;
  status: IStatusDelivery;
  products: IProductsOrder[];
  amounts: IAmounts;
  address: string;
  shipment_date: string;
}
  interface IPaidAmount {
    percent: number;
    sum: number;
  }
  interface IAmounts {
    paid_amount: IPaidAmount;
    total_amount: number;
    rest_amount: number;
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
  IAmounts,
  ISupport,
  IButtons,
};
