import React from 'react';
import Text from '../Text/Text';

interface BadgeProps {
    color?: string;
    size?: number;
    textStatus?: string;
    isBadge: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  size = 5,
  color = "#ff0000",
  textStatus,
  isBadge,
}) => (
  <div
    style={{
      display: "flex",
      gap: "5px",
      alignItems: "center",
    }}
  >
    {isBadge && <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />}
    {!!textStatus && (
      <Text
        text={textStatus}
        style={{
          color: color,
          fontSize: 10,
        }}
      />
    )}
  </div>
);

export default Badge;