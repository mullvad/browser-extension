const unique = <T>(list: T[], key: keyof T): T[] => {
  return [...new Map(list.map((entry) => [entry[key], entry])).values()];
};

export default unique;
