import { FC } from "react";
import sprite from "../../images/svg/sprite.svg";

export interface IIconProps {
  iconName: string;
  width: number;
  height: number;
  className?: string;
}

const Icon: FC<IIconProps> = ({ iconName, width, height, className }) => {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`${sprite}#${iconName}`} />
    </svg>
  );
};

export default Icon;
