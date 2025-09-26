import styles from "./styles/input.module.scss";
import { Icon } from "../Icons/Icons";

interface IProps {
  iconLeft?: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input: React.FC<IProps> = ({
  iconLeft,
  placeholder,
  className = "",
  onChange,
  value,
}) => {
  return (
    <div className={`${className} ${styles["input__container"]}`}>
      {iconLeft && (
        <Icon className={styles["input__icon-left"]} src={iconLeft} />
      )}
      <input
        value={value}
        name="input"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
