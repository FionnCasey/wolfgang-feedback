const capitaliseWord = word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();

const formatName = string => {
  const names = string.split(' ');
  let first = capitaliseWord(names[0]);
  if (names[1]) {
    first += ` ${names[1].slice(0, 1).toUpperCase()}`;
  }
  return first;
};

export {
  capitaliseWord,
  formatName
};