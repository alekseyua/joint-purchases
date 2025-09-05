


import { Link } from 'react-router';
import Block from '~/UI/Blocks/Block';
import Container from '~/UI/Blocks/Container'
import Line from '~/UI/Blocks/Line';
import Offset from '~/UI/Blocks/Offset';
import Text from '~/UI/Text/Text';
import Title from '~/UI/Title/Title';

type Props = {}

const Instruction:React.FC<Props> = (props: Props) => {
  const urlAdm = "http://t.me/admrazb";
  const urlManager = "http://t.me/STASUAE";
  const urlInstruction = "https://teletype.in/@adamrazba/dlyacarv";
  return (
    <Container>
      <Offset mt={16} />
      <Title title="Инструкция" tag="h1" />
      <Offset mt={14} />
      <Text text={"✅ СПОСОБЫ РАСЧЕТОВ"} />
      <Offset mt={14} />

      <Block variant="info-container">
        <Text text={"1) НАЛИЧНЫЕ"} style={{ fontWeight: 700 }} />
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          ➡️ Из рук в руки — Челябинск, Питер, Ростов на Дону (
          <Link to={urlAdm}>{urlAdm}</Link>)
        </Text>
        <Offset mt={6} />
        <Text text={"ℹ️ Любые суммы"} style={{ fontWeight: 400 }} />
        <Offset mt={6} />
        <Line />
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          ➡️ Из рук в руки — Москва, Ульяновск, Новокузнецк, Самара,
          Екатеринбург, Тюмень (<Link to={urlAdm}>{urlAdm}</Link>)
        </Text>
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          ℹ️ Суммы от <b>350 000 руб</b>
        </Text>
        <Text style={{ fontWeight: 400 }}>(излишек на баланс записываем)</Text>
        <Offset mt={6} />
        <Line />
        <Offset mt={6} />

        <Text style={{ fontWeight: 400 }}>
          ➡️ Из рук в руки — другие города-миллионники (
          <Link to={urlAdm}>{urlAdm}</Link>)
        </Text>
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          ℹ️ Суммы от <b> 500 000 руб.</b>
        </Text>
        <Text style={{ fontWeight: 400 }}>(излишек на баланс записываем)</Text>
        <Offset mt={6} />
        <Line />
        <Offset mt={6} />
        <Text text="➡️ Выпуск дополнительной карты и отправка нам для снятия наличных" />
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          ℹ️ Данные для отправки уточните у менеджера. (
          <Link to={urlManager}>{urlManager}</Link>)
        </Text>
        <Offset mt={6} />
        <Text
          text={"Приоритет: Альфа, ВТБ, Т-Банк, Сбер и др."}
          style={{ fontWeight: 700 }}
        />
        <Offset mt={6} />
        <Text
          style={{ fontWeight: 400 }}
          text="Работает отлично — рекомендуем активно использовать!"
        />
        <Offset mt={6} />
        <Line />
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          ➡️ Привязка вашей карты к нашему <b>Mir Pay (кроме Альфы)</b>
        </Text>
        <Offset mt={6} />
        <Text
          style={{ fontWeight: 400 }}
          text="ℹ️ Альтернатива отправке карты."
        />
        <Offset mt={6} />
        <Text
          style={{ fontWeight: 400 }}
          text="Привязываем карту удалённо — сможем снимать только в банкомате."
        />
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          Подробности у менеджера (<Link to={urlManager}>{urlManager}</Link>)
        </Text>
      </Block>
      <Offset mt={6} />

      <Block variant="info-container">
        <Text text={"2) ПРИЕМ USDT"} style={{ fontWeight: 700 }} />
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          ➡️ Кошелек для приёма сообщит менеджер (
          <Link to={urlManager}>{urlManager}</Link>)
        </Text>
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          ℹ️ Комиссия <b>1,5%</b>
        </Text>
        <Offset mt={6} />
      </Block>
      <Offset mt={6} />

      <Block variant="info-container">
        <Text
          text={"3) ПЕРЕВОД ДО 100 000 РУБЛЕЙ"}
          style={{ fontWeight: 700 }}
        />
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          Перевод в Таджикистан{" "}
          <span
            style={{ color: "var( --color-status-error)", fontWeight: 700 }}
          >
            (НЕ НА ВТБ)
          </span>
        </Text>
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          ℹ️ Принимаем с <b>Сбер, ВТБ, Тиньков, Газпром</b> - инструкция (
          <Link to={urlInstruction}>{urlInstruction}</Link>)
        </Text>
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }}>
          ➡️ По номеру <a href={"tel:+7 952 502 20 20"}>+7 952 502 20 20</a>
        </Text>
        <Offset mt={6} />
        <Text style={{ fontWeight: 400 }} text="➡️ Получатель: Илья А" />
        <Offset mt={6} />
        <Text
          style={{ fontWeight: 400 }}
          text="➡️ Банк: Международный банк Таджикистана"
        />
        <Offset mt={6} />
      </Block>
    </Container>
  );
}

export default Instruction