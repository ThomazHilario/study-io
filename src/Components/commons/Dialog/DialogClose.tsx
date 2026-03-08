import * as DialogRadix from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

type DialogCloseProps = DialogRadix.DialogCloseProps & PropsWithChildren;

export const DialogClose = ({ children, ...props }: DialogCloseProps) => {
  return <DialogRadix.Close {...props}>{children}</DialogRadix.Close>;
};
