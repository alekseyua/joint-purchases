import styles from './styles/block.module.scss';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  variant: "info-container" | "grid" | 'flex' | 'flex-column';
  gtc?: string;
  gap?: number;
  br?: number;
}

const Block: React.FC<IProps> = ({
    br = 12,
    gtc,
    gap,
    variant,
    children, 
 }: IProps) => {
const variants: Record<string, string> = {
  "info-container": styles["block__info-container"],
  "grid": styles["block__grid"],
  "flex": styles["block__flex"],
  "flex-column": styles["block__flex--column"],
};
let customStyle:React.CSSProperties = {};
if (gtc) customStyle.gridTemplateColumns = gtc;
if (gap) customStyle.gap = gap;
if (br) customStyle.borderRadius = br;

     return <div className={`${variants[variant]}`} style={customStyle}>{children}</div>;
};

export default Block;