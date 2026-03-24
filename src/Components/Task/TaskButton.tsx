import { cn } from "@/utils";
import { Button } from "../commons";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type AddTaskButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren;

export const TaskButton = ({
  children,
  className,
  ...props
}: AddTaskButtonProps) => (
  <Button
    className={cn(
      "w-full flex justify-center items-center border-solid outline-0 border border-gray-400 p-1 px-4 rounded-lg",
      className,
    )}
    {...props}
  >
    {children}
  </Button>
);
