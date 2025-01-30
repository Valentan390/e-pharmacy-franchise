import { FC, ReactNode } from "react";

interface IButtonProps {
  onClick: () => void;
  type?: "submit" | "button";
  children: ReactNode;
  className?: string;
}

const Button: FC<IButtonProps> = ({
  onClick,
  type = "submit",
  className,
  children,
}) => {
  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;
