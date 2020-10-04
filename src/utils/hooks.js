import { useEffect } from 'react';

// Custom hook adapted from https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb
export const useMasonryLayout = (ref) => {
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
          (item.firstChild.getBoundingClientRect().height + rowGap) /
            (rowHeight + rowGap)
        );
        item.style.gridRowEnd = `span ${rowSpan}`; // eslint-disable-line
      });
    }

    window.onload = resizeGridItems();

    window.addEventListener('resize', resizeGridItems);

    return () => window.removeEventListener('resize', resizeGridItems);
  }, [isClient, ref]);
};

export default useMasonryLayout;
