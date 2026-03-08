import * as DialogRadix from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

type DialogPortalProps = DialogRadix.DialogPortalProps & PropsWithChildren;

export const DialogPortal = ({ children, ...props }: DialogPortalProps) => {
  return <DialogRadix.Portal {...props}>{children}</DialogRadix.Portal>;
};
