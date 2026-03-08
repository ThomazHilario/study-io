import * as DialogRadix from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

type DialogProps = DialogRadix.DialogContentProps & PropsWithChildren;

export const DialogContent = ({ children, ...props }: DialogProps) => {
  return <DialogRadix.Content {...props}>{children}</DialogRadix.Content>;
};
