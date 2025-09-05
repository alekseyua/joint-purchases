;
import styles from './styles/button.module.scss';
import { Link } from 'react-router';
import { useNavigate } from "react-router";


export type variantsButton = "primary"
    | "secondary"
    | "support-white"
    | "black-full"
    | "grey-full"
    | "comeback"
    | "telegram-blue-full"
    | "blue-full";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: variantsButton;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  p?: string;
  to?: string | number;
};

const Button: React.FC<ButtonProps> = ({
    p,
    to,
    children,
    variant = 'primary',
    iconLeft,
    iconRight,
    ...props
}) => {
  let navigate = useNavigate();
    const baseStyle: React.CSSProperties = {
        cursor: 'pointer',
    };
    if(p) baseStyle.padding = p;

    const variants: Record<string, string> = {
      primary: styles["button__primary"],
      secondary: styles["button__secondary"],
      "support-white": styles["button__support--white"],
      "black-full": styles["button__black--full"],
      "grey-full": styles["button__grey--full"],
      comeback: styles["button__comeback"],
      "telegram-blue-full": styles["button__telegram-blue-full"],
    };

    if(to){
        return (
          <Link
            viewTransition
            to={typeof to === "string" ? to : ""}
            onClick={() => {
              typeof to === "number" && navigate(to);
            }}
            style={{ ...baseStyle }}
            className={`${styles["button__link"]} ${variants[variant]}`}
          >
            {iconLeft && (
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                {iconLeft}
              </span>
            )}
            <span>{children}</span>
            {iconRight && (
              <span style={{ display: "inline-flex", marginLeft: 5 , alignItems: "center" }}>
                {iconRight}
              </span>
            )}
          </Link>
        );
    }

    return (
      <button style={{ ...baseStyle }} className={variants[variant]} {...props}>
        {iconLeft && (
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            {iconLeft}
          </span>
        )}
        <span>{children}</span>
        {iconRight && (
          <span
            style={{
              display: "inline-flex",
              marginLeft: 5,
              alignItems: "center",
            }}
          >
            {iconRight}
          </span>
        )}
      </button>
    );
};

export default Button;