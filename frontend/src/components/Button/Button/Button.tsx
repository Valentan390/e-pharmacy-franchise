import { FC, ReactNode } from "react";

interface IButtonProps {
  onClick?: () => void;
  type?: "submit" | "button";
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

const Button: FC<IButtonProps> = ({
  onClick,
  type = "submit",
  className,
  children,
  disabled,
  ariaLabel,
}) => {
  return (
    <button
      aria-label={ariaLabel}
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
