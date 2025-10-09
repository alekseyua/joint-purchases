;

type IconProps = {
    size?: number;
    src: string; // Add src for both SVG and PNG
    className?: string;
    up?: number;
    down?: number;
    style?: React.CSSProperties;
    alt?: string;
    width?: string;
    height?: string;
};

export const Icon: React.FC<IconProps> = ({
    up,
    src,
    down,
    size = 24,
    alt,
    style,
    width,
    height,
    className,
}) => {
    const customStyle: React.CSSProperties = {
        display: 'inline-block',
        position: 'relative',
    }
    if (up) customStyle.bottom = up;
    if (down) customStyle.top = down;
    // Render PNG or external SVG via <img>
    return <img
        src={src}
        style={{
            ...customStyle,
            ...style,
        }}
        className={className}
        width={width? width : size}
        height={height? height : size}
        alt={alt ?? "icon"}
    />;
};
