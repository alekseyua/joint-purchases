import React from 'react';
import styles from './styles/card.module.scss';

interface CardContainerProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const CardContainer: React.FC<CardContainerProps> = ({ 
    children, 
    className = '', 
    style,
}) => {
    return (
        <div
            className={`${styles['card__order-container']} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default CardContainer;