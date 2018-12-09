exports.flatten = data => {
  const flattened = {};
  Object.entries(data).forEach(entry => {
    const splitted = entry[0].split('.');
    flattened[splitted[splitted.length - 1]] = entry[1];
  });
  return flattened;
};
