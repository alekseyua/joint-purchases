import React from 'react'
import Avatar from '~/UI/Avatar/Avatar';
import styles from './styles/header.module.scss';
import Title from '~/UI/Title/Title';
import Input from '~/UI/Input/Input';
import { icons } from '~/images';

interface IProps {
    name?: string;
}

const Header: React.FC<IProps> = ({
    name = 'Андрей'
}: IProps) => {
    return (
        <div
            className={styles["header__container"]}
        >
            <div
                className={styles["header__top"]}
            >
                <Title
                    tag={'div'}
                    className={styles["header__logo"]}
                    style={{ color: 'var(--text-color)' }}
                >Logo</Title>
                <Avatar />
            </div>
            <div
                className={styles["header__title-container"]}
            >
                <Title
                    tag={'h2'}
                    style={{ color: 'var(--text-color)' }}
                >Здравствуйте, {name}</Title>

            </div>
            <div
                className={styles["header__search-container"]}
            >
                <Input
                    iconLeft={icons.searchWhite}
                    placeholder={'Поиск по заказам'}
                    className={styles["header__search-input"]}
                    
                />
            </div>
        </div>
    )
}

export default Header