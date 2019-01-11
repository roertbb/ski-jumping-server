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

exports.deletePrefixesToObj = elems => {
  return elems.map(elem => {
    const obj = {};
    Object.entries(elem).forEach(entry => {
      const key = entry[0].split('.');
      if (key.length === 3) {
        if (obj[key[key.length - 2]] === undefined)
          obj[key[key.length - 2]] = {};
        obj[key[key.length - 2]][key[key.length - 1]] = entry[1];
      } else obj[key[key.length - 1]] = entry[1];
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
