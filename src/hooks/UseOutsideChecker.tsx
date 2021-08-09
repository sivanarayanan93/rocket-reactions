import { useEffect } from 'react';

const useOutsideChecker = (ref: any , handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setTimeout(()=> {
          handler();
        });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useOutsideChecker;