import * as DialogRadix from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

type DialogProps = DialogRadix.DialogProps & PropsWithChildren;

export const Dialog = ({ children, ...props }: DialogProps) => {
  return <DialogRadix.Root {...props}>{children}</DialogRadix.Root>;
};
