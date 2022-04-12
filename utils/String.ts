export const formatTime = (time: number) => {
  const str = time.toString().padStart(4, "0");
  return `${str.slice(0, 2)}:${str.slice(2, 4)}`;
};
