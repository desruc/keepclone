/**
 * Generates a random string to use for map keys
 */
export const randomId = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

/**
 * Transforms a date object into a human readable string
 * @param {Date} date the note timestamp
 */
export const getFormattedDate = (date) => {
  if (!date) return null;

  const parsed = date.toDate();

  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    parsed
  );
  const day = parsed.getDate();
  const year = parsed.getFullYear();
  return `${month} ${day}, ${year}`;
};

export default randomId;
