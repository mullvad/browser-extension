const pluralize = (word: string, count: number, plural?: string) => {
  if (count === 1) {
    return `${count} ${word}`;
  }
  if (plural) {
    return `${count} ${plural}`;
  }
  return `${count} ${word}s`;
};

export default pluralize;
