import { FC, ReactNode } from "react";

interface IButtonProps {
  onClick?: () => void;
  type?: "submit" | "button";
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = ({
  onClick,
  type = "submit",
  className,
  children,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
