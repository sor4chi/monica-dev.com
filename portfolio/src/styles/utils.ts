export const sumOfRems = (...args: string[]) => {
  if (!args.every((arg) => arg.endsWith("rem"))) {
    throw new Error("Invalid args");
  }
  const numbers = args.map((arg) => parseFloat(arg.replace("rem", "")));
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return `${sum}rem`;
};
