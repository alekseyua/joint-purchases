import { icons } from "~/images";
import type { IButtons, ISupport } from "~/types/types";
import Block from "~/UI/Blocks/Block";
import Container from "~/UI/Blocks/Container";
import Offset from "~/UI/Blocks/Offset";
import Button from "~/UI/Button/Button";
import { Icon } from "~/UI/Icons/Icons";
import Text from "~/UI/Text/Text";
import Title from "~/UI/Title/Title";

interface Props {
  listSupports: ISupport[];
}

const Support: React.FC<Props> = ({ listSupports }: Props) => {
  return (
    <Container>
      <Offset mt={16} />
      <Offset mt={6} />
      <Title title="Поддержка" tag="h1" />
      <Offset mt={12} />
      <Text
        text={
          "Помощь и ответы на часто задаваемые вопросы. Напишите нашим менеджерам, чтобы задать вопрос."
        }
        style={{ fontWeight: 400 }}
      />
      <Offset mt={14} />
      {!!listSupports.length ? (
        listSupports.map((s: ISupport, i: number) => {
          const listButtons: IButtons[] = s.buttons;
          return (
            <div key={i}>
              <Block variant="info-container" br={20}>
                <Offset mt={6} />
                <Block variant="grid" gtc="2fr 6fr 5fr">
                  <Icon src={s.avatar ? s.avatar : icons.avatar} size={40} style={{overflow: "hidden", borderRadius: '50%'}}/>
                  <Block variant="flex-column">
                    <Text
                      text={s.title}
                      style={{ fontWeight: 700, fontSize: 14 }}
                    />
                    <Offset mt={6} />
                    <Text text={s.description} style={{ fontWeight: 400 }} />
                  </Block>
                  <Block variant="grid">
                    {listButtons.map((b: IButtons, i: number) => (
                      <Button
                        key={i}
                        to={b.href}
                        p={"11px 0px"}
                        variant={b.style}
                        iconRight={<Icon src={icons.telegramWhite} size={17} />}
                      >
                        {b.name}
                      </Button>
                    ))}
                  </Block>
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
          {/* <Title title="Здесь будут Ваши Уведомления " tag="h2" /> */}
        </>
      )}
      <Offset mb={40} />
    </Container>
  );
};

export default Support;
