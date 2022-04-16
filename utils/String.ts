export const formatTime = (time: number) => {
  const str = time.toString().padStart(4, "0");
  return `${str.slice(0, 2)}:${str.slice(2, 4)}`;
};

export const makeId = (input: string) =>
  input.toLocaleLowerCase().split(" ").join("-");
