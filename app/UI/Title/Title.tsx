import React from 'react';
import styles from './styles/title.module.scss';

interface IProps {
    title?: string;
    children?: React.ReactNode;
    tag: 'h1' | 'h2' | 'div';
    style?: React.CSSProperties;
    className?: string;
}

const Title: React.FC<IProps> = ({
    tag,
    title,
    style = {},
    children,
    className = '',
}: IProps) => {

    switch (tag) {
        case "h1":
            return (
                <h1
                    style={style}
                    className={styles["title"] + ' ' + className}
                >{title || children}</h1>
            );
        case "h2":
            return (
                <h2
                    style={style}
                    className={styles["title"] + ' ' + className}
                >{title || children}</h2>
            )
        default:
            return (
                <div
                    style={style}
                    className={styles["title"] + ' ' + className}
                >{title || children}</div>
            );
    }
}

export default Title;