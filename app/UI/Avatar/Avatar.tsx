import React from 'react'
import styles from './styles/avatar.module.scss';
import { icons } from '~/images';

interface IProps {
    image?: string;
    countMsg?: number;
}

const Avatar:React.FC<IProps> = ({
    image = icons.avatar2,
    countMsg = 0,    
}:IProps) => {
  return (
    <div 
            className={styles['avatar__container']}
    
    >
        <div className={styles['avatar__container-inner']}>
            <img 
                src={image} alt="Avatar" 
                className={styles['avatar__image']}
            />
        </div>
       {!!countMsg && <span 
            className={styles['avatar__badge']}
       
       >
        {countMsg}
        </span>}
    </div>
  )
}

export default Avatar