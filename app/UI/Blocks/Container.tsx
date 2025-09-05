import styles from './styles/block.module.scss';

interface IProps {
    children: React.ReactNode;
}

const Container: React.FC<IProps> = ({
    children
}: IProps) => {
    return (
        <div
            className={styles['block__container']}
        >{children}</div>
    )
}

export default Container;