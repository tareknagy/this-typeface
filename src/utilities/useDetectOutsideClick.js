import { useState, useEffect } from 'react';

export const useDetectOutsideClick = (el, initialState) => {
    const [isActive, setIsActive] = useState(false);

      // Close project list on any click.
    useEffect(() => {
        const pageClickEvent = (e) => {
          // ignore if it's an input box
          if (!(e.target instanceof HTMLInputElement)) {
            setIsActive(!isActive);
          }
        }
        // add and remove event listeners if it's in/active
        if (isActive) {
        window.addEventListener('click', pageClickEvent);
        }
        return () => {
        window.removeEventListener('click', pageClickEvent);
        }

    }, [isActive, el]);

    return [isActive, setIsActive];

}