exports.deletePrefixes = elems => {
  return elems.map(elem => {
    const obj = {};
    Object.entries(elem).forEach(entry => {
      const key = entry[0].split('.');
      obj[key[key.length - 1]] = entry[1];
    });
    return obj;
  });
};

exports.deletePrefixesSingleEntry = elem => {
  const obj = {};
  Object.entries(elem).forEach(entry => {
    const key = entry[0].split('.');
    obj[key[key.length - 1]] = entry[1];
  });
  return obj;
};
