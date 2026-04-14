export const sumOfRems = (...args: string[]) => {
  if (!args.every((arg) => arg.endsWith("rem"))) {
    throw new Error("Invalid args");
  }
  const sum = args.reduce((acc, arg) => acc + Number.parseFloat(arg), 0);
  return `${sum}rem`;
};
