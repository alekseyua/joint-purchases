import React from 'react'
import styles from './styles/corporation.module.scss';
import Text from '../Text/Text';
type Props = {}

const CorporationBadge:React.FC<Props> = ({
    
}: Props) => {
  return (
    <div
      className={styles['corporation__container']}
    >
      <Text  
        className={styles['corporation__text']}
        text = {'© SovZakup App' + new Date().getFullYear()}
      />
    </div>
  )
}

export default CorporationBadge