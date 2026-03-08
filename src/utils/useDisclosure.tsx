import { useState } from "react";

export const useDisclosure = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = () => setOpen(!open);

  const onClose = () => setOpen(false);

  return {
    open,
    setOpen,
    onOpenChange,
    onClose,
  };
};
