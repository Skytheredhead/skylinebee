import * as React from "react";
import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-emerald-600 text-white hover:bg-emerald-700",
  outline: "border border-emerald-200 text-emerald-900 hover:bg-emerald-50",
  ghost: "text-emerald-900 hover:bg-emerald-50",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "md",
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Component: any = asChild ? (props as any).asChildComponent || "button" : "button";
    return (
      <Component
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${
          variantClasses[variant]
        } ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
