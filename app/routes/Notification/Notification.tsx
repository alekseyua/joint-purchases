import { icons } from "~/images";
import type { IButtons, INotification } from "~/types/types";
import Block from "~/UI/Blocks/Block";
import Container from "~/UI/Blocks/Container";
import Offset from "~/UI/Blocks/Offset";
import Button from "~/UI/Button/Button";
import { Icon } from "~/UI/Icons/Icons";
import Text from "~/UI/Text/Text";
import Title from "~/UI/Title/Title";

interface Props {
  listNotifications: INotification[];
}

const Notification: React.FC<Props> = ({ listNotifications }: Props) => {
  return (
    <Container>
      <Offset mt={16} />
      <Title title="Уведомления" tag="h1" />
      <Offset mt={14} />
      {!!listNotifications.length ? (
        listNotifications.map((n: INotification, i: number) => {
          const listButtons: IButtons[] = n.buttons;
          return (
            <div key={i}>
              <Block variant="info-container" br={20}>
                <Block variant="grid" gtc="2fr 10fr">
                  <Icon
                    src={n.status === "unread" ? icons.read : icons.unread}
                    size={40}
                  />
                  <Block variant="flex-column">
                    <Text
                      text={n.title}
                      style={{ fontWeight: 700, fontSize: 14 }}
                    />
                    <Offset mt={6} />
                    <Text text={n.description} style={{ fontWeight: 400 }} />
                  </Block>
                </Block>
                <Offset mt={18} />
                <Block
                  variant="grid"
                  gtc={listButtons.length > 1 ? "1fr .55fr" : "1fr"}
                  gap={6}
                >
                  {listButtons.map((b: IButtons, i: number) => (
                    <Button
                      key={i}
                      to={b.href}
                      p={"11px 0px"}
                      variant={b.style}
                    >
                      {b.name}
                    </Button>
                  ))}
                </Block>
                <Offset mt={6} />
              </Block>
              <Offset mt={6} />
            </div>
          );
        })
      ) : (
        <>
          <Offset mt={16} />
          <Title title="Здесь будут Ваши Уведомления " tag="h2" />
        </>
      )}
    </Container>
  );
};

export default Notification;
