/**
 * Generates a random string to use for map keys
 */
export const randomId = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

export default randomId;
