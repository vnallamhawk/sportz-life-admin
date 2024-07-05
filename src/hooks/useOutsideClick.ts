import { type RefObject, useEffect } from "react";

// similar to implementations found here: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

export default function useOutsideClick(
  ref: RefObject<HTMLElement> | null,
  callback: (e: Event) => void
) {
  useEffect(() => {
    function handleOutsideEvent(this: Document, e: Event) {
      if (e.target instanceof Element) {
        if (!ref || !ref.current?.contains(e.target)) {
          callback(e);
        }
      }
    }

    document.addEventListener("click", handleOutsideEvent);
    document.addEventListener("touchstart", handleOutsideEvent);
    return () => {
      document.removeEventListener("click", handleOutsideEvent);
      document.removeEventListener("touchstart", handleOutsideEvent);
    };
  }, [ref, callback]);
}
