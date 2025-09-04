import React from 'react';

type IconProps = {
    size?: number;
    src: string; // Add src for both SVG and PNG
    className?: string;
    up?: number;
    down?: number;
    style?: React.CSSProperties;
    alt?: string;
};

export const Icon: React.FC<IconProps> = ({
    up,
    src,
    down,
    size = 24,
    alt,
    style,
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
        width={size}
        height={size}
        alt={alt ?? "icon"}
    />;
};
