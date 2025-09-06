import { icons } from "~/images";
import type { IListOrderShotView } from "~/types/types.d";
import Block from "~/UI/Blocks/Block";
import Container from "~/UI/Blocks/Container";
import Offset from "~/UI/Blocks/Offset";
import Button from "~/UI/Button/Button";
import CardContainer from "~/UI/Cards/CardContainer";
import CardOrderShot from "~/UI/Cards/ShotCardOrder";
import { Icon } from "~/UI/Icons/Icons";
import Text from "~/UI/Text/Text";
import Title from "~/UI/Title/Title";


type MainProps = {
  openOrder: number | null;
  ListOrders: IListOrderShotView[]; // Replace 'any' with the correct type if known, e.g., ListOrders: OrderType[]
  handleOpenOrder: (id: number) => void;
};

export default function Main({
  ListOrders,
  openOrder,
  handleOpenOrder,
}: MainProps) {
  return (
    <Container>
      <Offset mt={6} />
      <Button
        to={"/support"}
        iconLeft={<Icon src={icons.supportBlack} size={22} up={4} />}
        variant="support-white"
      >
        Поддержка
      </Button>
      <Offset mt={16} />
      {!!ListOrders.length ? (
        <CardContainer>
          {ListOrders.map((o: IListOrderShotView) => {
            console.log({o})

            return <CardOrderShot
              handleOpenOrder={handleOpenOrder}
              openOrder={openOrder}
              key={o.id}
              idOrder={o.id}
              title={o.name}
              status={o.status.name}
              statusColor={o.status.color}
              address={o.address}
              shipmentDate={o.shipment_date}
              products={o.products}
            />
          }
          )}
          <Offset mb={40} />
        </CardContainer>
      ) : (
        <>
          <Offset mt={16} />
          <Title
            title="Здесь будут Ваши заказы"
            tag="h2"
            style={{ fontWeight: 700 }}
          />
          <Offset mt={6} />
          <Text
            text="Чтобы оформить заказ, напишите в поддержку и наши менеджеры помогут вам с подбором агрегата."
            style={{ fontWeight: 400 }}
          />
          <Offset mt={12} />
          <Block variant="grid" gtc="1fr 1fr">
            <Button to={'/support'} p={'12px'} variant="black-full">Написать менеджеру</Button>
          </Block>
        </>
      )}
    </Container>
  );
}
