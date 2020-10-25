import { useEffect } from 'react';

// Custom hook adapted from https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb
export const useMasonryLayout = (ref, dep = null) => {
  const isClient = typeof window === 'object';

  useEffect(() => {
    if (!isClient) return false;
    const grid = ref.current;

    // Dynamically resize grid items to cater for items that span multiple rows
    function resizeGridItems() {
      const gridItems = grid.children;

      Array.prototype.forEach.call(gridItems, (item) => {
        const rowHeight = parseInt(
          window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'),
          10
        );
        const rowGap = parseInt(
          window.getComputedStyle(grid).getPropertyValue('grid-row-gap'),
          10
        );
        const rowSpan = Math.ceil(
          (item.firstChild.firstChild.getBoundingClientRect().height +
            rowGap +
            80) /
            (rowHeight + rowGap)
        );

        item.style.gridRowEnd = `span ${rowSpan}`; // eslint-disable-line
      });
    }

    window.onload = resizeGridItems();

    window.addEventListener('resize', resizeGridItems);

    return () => window.removeEventListener('resize', resizeGridItems);
  }, [isClient, ref, dep]);
};

// https://usehooks.com/useOnClickOutside/
export const useOnClickOutside = (ref, handler, otherRefs = []) => {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent
        if (
          !ref.current ||
          ref.current.contains(event.target) ||
          otherRefs.some((r) => r.current && r.current.contains(event.target))
        ) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    [ref, handler]
  );
};
