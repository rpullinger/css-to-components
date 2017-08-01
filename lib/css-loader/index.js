'use strict';

var index = function (source) {
  if (typeof source === 'string') {
    source = source.replace(/(\.[A-Z].*){/g, function (match, p1) {
      return match.replace('[', '---').replace(']', '').replace('=', '-');
    });
  }

  return source;
};

module.exports = index;
