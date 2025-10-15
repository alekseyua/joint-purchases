import { useEffect, useState } from "react";
import Avatar from "~/UI/Avatar/Avatar";
import styles from "./styles/header.module.scss";
import Title from "~/UI/Title/Title";
import Input from "~/UI/Input/Input";
import { icons } from "~/images";
// import Logo from "~/images/logo/sovzakup.svg?react";
import { useLocation } from "react-router";
import Button from "~/UI/Button/Button";
import { Icon } from "~/UI/Icons/Icons";
import {
  useTelegram,
  type TelegramContextType,
} from "~/context/TelegramContext";
import {
  useWebSocket,
  type WebSocketContextType,
} from "~/context/WebsocketContext";
import {Logo} from "~/images/logo/Logo";

interface IProps {
  // name?: string;
}

const Header: React.FC<IProps> = ({}: IProps) => {
  let location = useLocation();
  const [fullHeader, setFullHeader] = useState<boolean>(true);
  const [name, setName] = useState<string | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const { webApp }: TelegramContextType = useTelegram();
  const { sendMessage, dispatch }: WebSocketContextType = useWebSocket();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setName(webApp?.initDataUnsafe?.user?.username);
    setAvatar(webApp?.initDataUnsafe?.user?.photo_url);
  }, [webApp]);

  useEffect(() => {
    /**
     * если не корневой путь то тогда покажем короткое меню
     */
    if (location.pathname !== "/") {
      return setFullHeader(false);
    }
    setFullHeader(true);
  }, [location]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const q = window.localStorage.getItem("q");
      if (q) {
        const msg = JSON.stringify({
          action: "search",
          q,
        });
        sendMessage(msg);
      }
    }
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setValue(q);
    dispatch({ type: "CLEAR_MESSAGES" });
    const msg = JSON.stringify({
      action: "search",
      q,
    });
    sendMessage(msg);
    if (typeof window !== "undefined") {
      if (q.length > 0) {
        window.localStorage.setItem("q", q);
      } else {
        window.localStorage.setItem("q", "");
      }
    }
  };

  if (fullHeader) {
    return (
      <div className={styles["header__container"]}>
        <div className={styles["header__top"]}>
          {/* <Icon src={icons.logo2} className={styles["header__logo"]} size={40} width="132"/> */}
          <Logo />
          <Avatar avatar={avatar} />
        </div>
        <div className={styles["header__title-container"]}>
          <Title tag={"h2"} style={{ color: "var(--text-color)" }}>
            Здравствуйте, {name && name}
          </Title>
        </div>
        <div className={styles["header__search-container"]}>
          <Input
            value={value}
            iconLeft={icons.searchWhite}
            placeholder={"Поиск по заказам"}
            className={styles["header__search-input"]}
            onChange={handleSearch}
          />
        </div>
      </div>
    );
  }
  return (
    <div className={styles["header__container--small"]}>
      <div className={styles["header__top--small"]}>
        <Button
          to={-1}
          iconLeft={<Icon src={icons.arrowLeftBlack} size={18} />}
          variant="comeback"
        >
          {""}
        </Button>
        <Avatar avatar={avatar} />
      </div>
    </div>
  );
};

export default Header;
