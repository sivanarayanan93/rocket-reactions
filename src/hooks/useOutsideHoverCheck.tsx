import { useEffect } from 'react';

export const useOutsideHoverCheck = (ref: any , handler: () => void) => {
  useEffect(() => {
    const handleHoverOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setTimeout(()=> {
          handler();
        });
      }
    }

    document.addEventListener("mouseover", handleHoverOutside);

    return () => {
      document.removeEventListener("mouseover", handleHoverOutside);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}