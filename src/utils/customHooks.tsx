import { useEffect, useState } from "react";

export const useDisclose = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    toggle: () => setIsOpen(!isOpen),
  };
};

export const useDebounce = (value = "", delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [delay, value]);

  return debouncedValue;
};
