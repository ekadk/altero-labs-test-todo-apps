import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default:
        "text-[var(--dark-grayish-blue)] hover:text-[var(--very-dark-grayish-blue)] active:text-transparent active:bg-clip-text active:bg-gradient-to-r active:from-[var(--gradient-a)] active:to-[var(--gradient-b)]",
      styled:
        "relative rounded-full aspect-square border border-[var(--very-light-grayish-blue)] hover:bg-gradient-to-br hover:from-[var(--gradient-a)] hover:to-[var(--gradient-b)] inline-flex justify-center p-0.5",
      active:
        "text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradient-a)] to-[var(--gradient-b)]",
    },
    size: {
      default: "",
      icon: "h-5 w-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
