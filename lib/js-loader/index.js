'use strict';

var replacement = /import(.*)from ['"](.*).css['"]/gi;

var index = function (source) {
  if (typeof source === 'string') {
    source = source.replace(replacement, function (match, p1, p2) {
      return '\n        import stylesssss from \'' + p2 + '.css\';\n        import cssToComponents from \'css-to-components\';\n        const ' + p1 + ' = cssToComponents(() => {})(stylesssss);\n      ';
    });
  }

  return source;
};

module.exports = index;
