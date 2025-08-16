import React from 'react';
import styles from './styles/input.module.scss';

interface IProps {
  iconLeft?: string;
  placeholder?: string;
  className?: string;
}

const Input:React.FC<IProps> = ({
    iconLeft,
    placeholder,
    className
    }: IProps) => {
    return (
        <div className={className + ' ' + styles["input__container"]}>
        {iconLeft && <img className={styles["input__icon-left"]} src={iconLeft} />}
        <input 
            name='input'
            type="text" 
            placeholder={placeholder} 
        />
        </div>
    );

    }
export default Input