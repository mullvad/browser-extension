const pluralize = (word: string, count: number, ending = 's') => {
  return `${count} ${word}${count === 1 ? '' : ending}`;
};

export default pluralize;
