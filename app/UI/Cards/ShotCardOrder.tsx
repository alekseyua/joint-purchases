import { Icon } from "../Icons/Icons";
import { icons } from "~/images";
import Badge from "../Badge/Badge";
import styles from "./styles/card.module.scss";
import Text from "../Text/Text";
import Offset from "../Blocks/Offset";
import type { IAmounts, IProductsOrder } from "~/types/types";
import Button from "../Button/Button";
import Block from "../Blocks/Block";
import Title from "../Title/Title";

type IProps = {
  openOrder: number | null;
  imageSrc?: string;
  title: string;
  status: string;
  statusColor?: string;
  idOrder: number;
  amounts: IAmounts;
  shipmentDate: string;
  address: string;

  products: IProductsOrder[];

  handleOpenOrder: (id: number) => void;
};

const CardOrderShot: React.FC<IProps> = ({
  title,
  status,
  idOrder,
  amounts,
  address,
  products,
  imageSrc,
  openOrder,
  statusColor = "#fff",
  shipmentDate,
  handleOpenOrder,
}: IProps) => (
  <div className={styles["card__order-item-container"]}>
    <div className={styles["card__order-shot-container"]}>
      {/* Left Image */}
      <div className={styles["card__order-shot-image-container"]}>
        <div className={styles["card__order-shot-image-wrap"]}>
          <Icon src={imageSrc ?? icons.boxTaped} alt={title} />
        </div>
        <div className={styles["card__order-shot-image-fone"]} />
      </div>

      {/* Center Content */}
      <div className={styles["card__order-shot-description-container"]}>
        {/* Title */}
        <Text text={title} />
        {/* Status Badge */}
        <Badge color={statusColor} textStatus={status} isBadge={true} />
      </div>

      {/* Right Arrow Icon */}
      <div
        onClick={() => handleOpenOrder(idOrder)}
        className={styles["card__order-shot-icon-detail-container"]}
      >
        <Icon src={icons.arrowDownBlack} size={10} down={4} />
      </div>
    </div>
    {idOrder === openOrder && (
      <div className={styles["card__order-full-container"]}>
        <Offset mt={18} />
        <Offset mt={6} />
        <Title tag="div" title="Логистика" style={{ fontWeight: 400 }} />
        <Offset mt={6} />
        <div className={styles["card__order-product-section-container"]}>
          <div className={styles["card__order-full-container--detail"]}>
            <Text text="Адрес доставки" style={{ fontWeight: 400 }} />
            <Text
              text={address}
              style={{ fontWeight: 700 }}
            />
          </div>
          <Offset mt={16} />
          <div className={styles["card__order-full-container--detail"]}>
            <Text text="Дата отгрузки" style={{ fontWeight: 400 }} />
            <Text
              text={shipmentDate}
              style={{ fontWeight: 700 }}
            />
          </div>
        </div>
        <Offset mt={16} />

        {/* finance data */}
        <Offset mt={6} />
        <Title tag="div" title="Финансы" style={{ fontWeight: 400 }} />
        <Offset mt={6} />
        <div className={styles["card__order-product-section-container"]}>
          <Block variant="grid" gtc="2fr 1fr 1fr">
            <Block variant="flex-column" gap={4}>
              <Text text=" Общая сумма" style={{ fontWeight: 400 }} />
              <Text
                text={amounts.total_amount.toString() + " ₽"}
                style={{ fontWeight: 700 }}
              />
            </Block>
            <Block variant="flex-column" gap={4}>
              <Text center text=" Оплачено" style={{ fontWeight: 400 }} />
              <Block variant="flex" gap={5}>
                <Text
                  center
                  text={amounts.paid_amount.sum.toString() + "₽"}
                  style={{ fontWeight: 700 }}
                />
                <Text
                  center
                  text={"(" + amounts.paid_amount.percent.toString() + "%)"}
                  style={{ fontWeight: 700, color: "#10BC00" }}
                />
              </Block>
            </Block>
            <Block variant="flex-column" gap={4}>
              <Text center text=" Доплатить" style={{ fontWeight: 400 }} />
              <Text
                center
                text={amounts.rest_amount.toString() + " ₽"}
                style={{ fontWeight: 700, color: "red" }}
              />
            </Block>
          </Block>
        </div>

        <Offset mt={6} />
        <Title tag="div" title="Товары" style={{ fontWeight: 400 }} />
        <Offset mt={6} />
        {/* table products */}
        <div className={styles["card__order-product-container"]}>
          {/* header
          <div className={styles["card__order-product-header-container"]}>
            <Text text="Товары" style={{ fontWeight: 400, fontSize: 10 }} />
            <Text text="Товар" style={{ fontWeight: 400, fontSize: 10 }} />
            <Text text="Доставка" style={{ fontWeight: 400, fontSize: 10 }} />
          </div> */}
          {/* body */}
          {products.map((p: IProductsOrder) => (
            <div className={styles["card__order-product-body-container"]}>
              <div className={styles["card__order-product-card-container"]}>
                {/* left icon */}
                <div
                  className={styles["card__order-product-card-container-image"]}
                >
                  <Icon
                    src={
                      //p?.product_image ?? нет изображения с ws
                      icons.boxTaped
                    }
                    size={32}
                    style={{ zIndex: 2 }}
                  />
                  <div
                    className={
                      styles[
                        "card__order-product-card-container-image--background"
                      ]
                    }
                  ></div>
                </div>
                {/* desc */}
                <div
                  className={styles["card__order-product-card-container-desc"]}
                >
                  {/* Title */}
                  <Text text={p.name} />
                  {/* Status Badge */}
                </div>

                {/* status shipment*/}

                <div
                  className={
                    styles["card__order-product-card-container--price-product"]
                  }
                >
                  <Text text={p.product_sum + " ₽"} />
                  {/* <Text text={"$ " + "???"} style={{ fontWeight: 400 }} /> */}

                  {/* <Icon
                    src={p.status_delivery ? icons.success : icons.error}
                    size={12}
                  />
                  <Text
                    text={p.status_delivery ? "Оплачено" : "Не оплачено"}
                    style={{ fontSize: 6 }}
                  /> */}
                </div>
              </div>
            </div>
          ))}
          {/* footer */}
          <div className={styles["card__order-product-footer-container"]}>
            <Button p={"11px 16px"} variant="black-full">
              Оплатить товары
            </Button>
            <Button p={"11px 16px"} to={"/instruction"} variant="grey-full">
              Инструкция
            </Button>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default CardOrderShot;
