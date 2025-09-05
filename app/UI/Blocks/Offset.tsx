import { type CSSProperties } from 'react';
import styles from './styles/block.module.scss';

interface IProps {
    mt?: string | number;
    mb?: string | number;
    ml?: string | number;
    mr?: string | number;
    pt?: string | number;
    pb?: string | number;
    pl?: string | number;
    pr?: string | number;
}

const Offset = ({
    mt,
    mb,
    ml,
    mr,
    pt,
    pb,
    pl,
    pr
}: IProps) => {
    let customStyles:CSSProperties = {};
    if (mt) customStyles.marginTop = mt;
    if (mb) customStyles.marginBottom = mb;
    if (ml) customStyles.marginLeft = ml;
    if (mr) customStyles.marginRight = mr;
    if (pt) customStyles.paddingTop = pt;
    if (pb) customStyles.paddingBottom = pb;
    if (pl) customStyles.paddingLeft = pl;
    if (pr) customStyles.paddingRight = pr; 

  return (
    <div className={styles['block__offset']}
        style={customStyles}
    ></div>
  )
}

export default Offset