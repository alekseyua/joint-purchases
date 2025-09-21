import { useEffect, useState } from "react";
import Avatar from "~/UI/Avatar/Avatar";
import styles from "./styles/header.module.scss";
import Title from "~/UI/Title/Title";
import Input from "~/UI/Input/Input";
import { icons } from "~/images";
import { useLocation } from "react-router";
import Button from "~/UI/Button/Button";
import { Icon } from "~/UI/Icons/Icons";
import { useTelegram, type TelegramContextType } from "~/context/TelegramContext";

interface IProps {
  // name?: string;
}

const Header: React.FC<IProps> = ({ }: IProps) => {
  let location = useLocation();
  const [fullHeader, setFullHeader] = useState<boolean>(true);
  const [name, setName] = useState<string | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const {webApp}: TelegramContextType = useTelegram();

  useEffect(()=>{
    setName(webApp?.initDataUnsafe?.user?.username);
    setAvatar(webApp?.initDataUnsafe?.user?.photo_url);
  },[webApp])
  useEffect(() => {
    /**
     * если не корневой путь то тогда покажем короткое меню
     */
    if (location.pathname !== "/") {
      return setFullHeader(false);
    }
    setFullHeader(true);
    console.log({ location });
  }, [location]);
console.log(webApp?.initDataUnsafe?.user?.photo_url);
   
  if (fullHeader) {
    return (
      <div className={styles["header__container"]}>
        <div className={styles["header__top"]}>
          <Title
            tag={"div"}
            className={styles["header__logo"]}
            style={{ color: "var(--text-color)" }}
          >
            Logo
          </Title>
          <Avatar avatar={avatar} />
        </div>
        <div className={styles["header__title-container"]}>
          <Title tag={"h2"} style={{ color: "var(--text-color)" }}>
            Здравствуйте, {name && name}
          </Title>
        </div>
        <div className={styles["header__search-container"]}>
          <Input
            iconLeft={icons.searchWhite}
            placeholder={"Поиск по заказам"}
            className={styles["header__search-input"]}
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
