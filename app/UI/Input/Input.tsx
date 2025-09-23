import styles from "./styles/input.module.scss";
import { Icon } from "../Icons/Icons";

interface IProps {
  iconLeft?: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IProps> = ({
  iconLeft,
  placeholder,
  className = "",
  onChange,
}) => {
  return (
    <div className={`${className} ${styles["input__container"]}`}>
      {iconLeft && (
        <Icon className={styles["input__icon-left"]} src={iconLeft} />
      )}
      <input
        name="input"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
