import { useState, useEffect } from 'react';

export const useDetectOutsideClick = (el, initialState) => {
    const [isActive, setIsActive] = useState(false);

      // Close project list on any click.
    useEffect(() => {
        const pageClickEvent = (e) => {
        setIsActive(!isActive);
        }
        if (isActive) {
        window.addEventListener('click', pageClickEvent);
        }
        return () => {
        window.removeEventListener('click', pageClickEvent);
        }

    }, [isActive, el]);

    return [isActive, setIsActive];

}