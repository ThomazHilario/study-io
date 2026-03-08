import * as DialogRadix from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

type DialogTriggerProps = DialogRadix.DialogTriggerProps & PropsWithChildren;

export const DialogTrigger = ({ children, ...props }: DialogTriggerProps) => {
  return <DialogRadix.Trigger {...props}>{children}</DialogRadix.Trigger>;
};
