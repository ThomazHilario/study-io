import { cn } from "@/utils";
import * as DialogRadix from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

type DialogFooterProps = DialogRadix.PrimitiveDivProps & PropsWithChildren;

export const DialogFooter = ({
  children,
  className,
  ...props
}: DialogFooterProps) => {
  return (
    <div className={cn("min-h-8 w-full py-3 px-4", className)} {...props}>
      {children}
    </div>
  );
};
