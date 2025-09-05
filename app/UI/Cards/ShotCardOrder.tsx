import { Icon } from "../Icons/Icons";
import { icons } from "~/images";
import Badge from "../Badge/Badge";
import styles from "./styles/card.module.scss";
import Text from "../Text/Text";
import Offset from "../Blocks/Offset";
import type { IProductsOrder } from "~/types/types";
import Button from "../Button/Button";

type IProps = {
  openOrder: number | null;
  imageSrc?: string;
  title: string;
  status: string;
  statusColor?: string;
  idOrder: number;
  shipmentDate: string;
  address: string;
  products: IProductsOrder[]

  handleOpenOrder: (id: number) => void;
};

const CardOrderShot: React.FC<IProps> = ({
  title,
  status,
  idOrder,
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
        <div className={styles["card__order-full-container--detail"]}>
          <Text text="Адрес доставки" style={{ fontWeight: 400 }} />
          <Text text={address} style={{ fontWeight: 700 }} />
        </div>
        <Offset mt={16} />
        <div className={styles["card__order-full-container--detail"]}>
          <Text text="Адрес доставки" style={{ fontWeight: 400 }} />
          <Text text={shipmentDate} style={{ fontWeight: 700 }} />
        </div>
        <Offset mt={16} />

        {/* table products */}
        <div className={styles["card__order-product-container"]}>
          {/* header */}
          <div className={styles["card__order-product-header-container"]}>
            <Text text="Товары" style={{ fontWeight: 400, fontSize: 10 }} />
            <Text text="Товар" style={{ fontWeight: 400, fontSize: 10 }} />
            <Text text="Доставка" style={{ fontWeight: 400, fontSize: 10 }} />
          </div>
          {/* body */}
          {products.map((p: IProductsOrder) => (
            <div className={styles["card__order-product-body-container"]}>
              <div className={styles["card__order-product-card-container"]}>
                {/* left icon */}
                <div
                  className={styles["card__order-product-card-container-image"]}
                >
                  <Icon
                    src={p.product_image ?? icons.boxTaped}
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
                  <Badge
                    color={p.status.color}
                    textStatus={p.status.name}
                    isBadge={false}
                  />
                </div>
                {/* status product*/}
                <div
                  className={
                    styles["card__order-product-card-container-status"]
                  }
                >
                  <Icon
                    src={p.status_payment ? icons.success : icons.error}
                    size={12}
                  />
                  <Text
                    text={p.status_payment ? "Оплачено" : "Не оплачено"}
                    style={{ fontSize: 6 }}
                  />
                </div>
                {/* status shipment*/}

                <div
                  className={
                    styles["card__order-product-card-container-status"]
                  }
                >
                  <Icon
                    src={p.status_delivery ? icons.success : icons.error}
                    size={12}
                  />
                  <Text
                    text={p.status_delivery ? "Оплачено" : "Не оплачено"}
                    style={{ fontSize: 6 }}
                  />
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
