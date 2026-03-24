import { cn } from "@/utils";
import * as DialogRadix from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

type DialogHeaderProps = DialogRadix.PrimitiveDivProps & PropsWithChildren;

export const DialogHeader = ({
  children,
  className,
  ...props
}: DialogHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between min-h-8 border-b-[1px] border-gray-400 py-3 px-4 w-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
