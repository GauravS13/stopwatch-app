import { ReactNode } from "react";

export interface ButtonProps {
  onClick: VoidFunction;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}
