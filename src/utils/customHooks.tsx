import { useState } from "react";
export const useDisclose = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    toggle: () => setIsOpen(!isOpen),
  };
};
