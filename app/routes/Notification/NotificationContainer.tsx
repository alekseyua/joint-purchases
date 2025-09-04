
import React from 'react'
import Notification from './Notification'
import type { INotification } from '~/types/types';

type Props = {}

const NotificationContainer = (props: Props) => {
    const fakeNotifications: INotification[] = [
      {
        title: "Ваш заказ не оплачен",
        description: "Для отправки заказа требуется оплата.",
        status: "read",
        buttons: [
          {
            name: "Оплатить",
            action: "pay",
            style: "black-full",
          },
          {
            name: "Инструкция",
            action: "link",
            href: "/instruction",
            style: "grey-full",
          },
        ],
      },
      {
        title: "Ваш заказ в пути",
        description: "Заказ отправлен и скоро прибудет в пункте доставки",
        status: "unread",
        buttons: [
          {
            name: "Поддержка",
            action: "link",
            href: "/support",
            style: "grey-full",
          },
        ],
      },
    ];
  return <Notification listNotifications={fakeNotifications} />;
}

export default NotificationContainer