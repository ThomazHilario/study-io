import { cn } from "@/utils";
import * as DialogRadix from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

type DialogBodyProps = DialogRadix.PrimitiveDivProps & PropsWithChildren;

export const DialogBody = ({
  children,
  className,
  ...props
}: DialogBodyProps) => {
  return (
    <div className={cn("min-h-20 w-full px-4", className)} {...props}>
      {children}
    </div>
  );
};
