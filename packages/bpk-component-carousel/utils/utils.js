const replacer = (match, placeholder) => {
  if (placeholder === 'timestamp') {
    return new Date().getTime();
  }
  return match;
};

const Utils = {
  replace(uri) {
    return uri.replace(/\[(\w+)]/g, replacer);
  },
  getIntegerValueFromStyle(string) {
    if (string && string.indexOf('rem')) {
      return parseFloat(string.replace('rem', ''));
    }
    return string;
  },
};

module.exports = Utils;
