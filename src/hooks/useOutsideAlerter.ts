import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOutsideAlerter = (ref: any, onClose: () => void) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, ref]);
};

export default useOutsideAlerter;
