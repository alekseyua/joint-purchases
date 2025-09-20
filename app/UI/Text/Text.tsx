;
import styles from './styles/label.module.scss';


type LabelProps = {
    text?: string;
    htmlFor?: string;
    className?: string;
    variant?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    center?: boolean;
};
const getVariantClass = (variant?: string) => {
    if (!variant) return '';
    return styles['label__' + variant] || '';
};
const Text: React.FC<LabelProps> = ({ 
    text, 
    htmlFor, 
    variant = '', 
    className,
    style,
    children,
    center,
}) => {
    let customStyle:React.CSSProperties & Record<string, string> = {};
    if(center) customStyle.textAlign = 'center';
    return(
    <span 
        className={`${styles['label__container']} ${!!className? className : ''} ${getVariantClass(variant)}`}
        style={{...style,...customStyle}}
    >
        {!!text && text}
        {!!children && children
            // <span dangerouslySetInnerHTML={{__html: children}} />
        }
    </span>
)};

export default Text;