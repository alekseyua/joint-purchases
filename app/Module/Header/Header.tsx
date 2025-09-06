import { useEffect, useState } from "react";
import Avatar from "~/UI/Avatar/Avatar";
import styles from "./styles/header.module.scss";
import Title from "~/UI/Title/Title";
import Input from "~/UI/Input/Input";
import { icons } from "~/images";
import { useLocation } from "react-router";
import Button from "~/UI/Button/Button";
import { Icon } from "~/UI/Icons/Icons";

interface IProps {
  name?: string;
}

const Header: React.FC<IProps> = ({ name = "Андрей-1" }: IProps) => {
  let location = useLocation();
  const [fullHeader, setFullHeader] = useState<boolean>(true);

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
          <Avatar />
        </div>
        <div className={styles["header__title-container"]}>
          <Title tag={"h2"} style={{ color: "var(--text-color)" }}>
            Здравствуйте, {name}
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
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
