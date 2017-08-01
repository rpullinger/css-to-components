'use strict';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};







var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var compose = function compose() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(function (f, g) {
    return function () {
      return f(g.apply(undefined, arguments));
    };
  });
};
var filter = function filter(func) {
  return function (array) {
    return array.filter(func);
  };
};
var map = function map(func) {
  return function (array) {
    return array.map(func);
  };
};
var reduce = function reduce(func, initial) {
  return function (array) {
    return array.reduce(func, initial);
  };
};
var prepend = function prepend(value) {
  return function (array) {
    return array.slice().unshift(value);
  };
};
var keys = Object.keys;
var merge = function merge(object1) {
  return function (object2) {
    return Object.assign({}, object1, object2);
  };
};
var join = function join(divider) {
  return function (array) {
    return array.join(divider);
  };
};
var toPairs = function toPairs(object) {
  return map(function (key) {
    return [key, object[key]];
  })(keys(object));
};
var dissoc = function dissoc(prop) {
  return function (object) {
    var newObject = Object.assign({}, object);
    delete newObject[prop];
    return newObject;
  };
};
var pickBy = function pickBy(func) {
  return function (object) {
    return reduce(function (all, key) {
      if (func(key)) all[key] = object[key];
      return all;
    }, {})(keys(object));
  };
};
var groupBy = function groupBy(func) {
  return function (array) {
    return reduce(function (all, key) {
      var base = func(key);
      all[base] = all[base] ? [].concat(toConsumableArray(all[base]), [array[key]]) : [array[key]];
      return all;
    }, [])(array);
  };
};

var trimFalse = function trimFalse(classname) {
  return classname.replace(/-false$/, '');
};
var trimTrue = function trimTrue(classname) {
  return classname.replace(/-true$/, '');
};
var toClassName = function toClassName(base) {
  return function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return base + '---' + key + '-' + value;
  };
};

var createComponent = function createComponent(h) {
  return function (_ref3) {
    var _ref3$base = _ref3.base,
        base = _ref3$base === undefined ? '' : _ref3$base,
        _ref3$styles = _ref3.styles,
        styles = _ref3$styles === undefined ? [] : _ref3$styles;
    return function (_ref4) {
      var className = _ref4.className,
          _ref4$tag = _ref4.tag,
          tag = _ref4$tag === undefined ? 'div' : _ref4$tag,
          props = objectWithoutProperties(_ref4, ['className', 'tag']);

      var component = h(tag, _extends({}, props, {
        className: compose(join(' '), prepend(className), prepend(styles[base]), map(compose(function (key) {
          return styles[key];
        }, trimFalse, trimTrue, toClassName(base))), toPairs, dissoc('children'))(props)
      }));
      component.displayName = base;
      return component;
    };
  };
};

var addStyleNames = function addStyleNames(s) {
  return function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        base = _ref2[0],
        styles = _ref2[1];

    return {
      base: base,
      styles: reduce(function (all, style) {
        all[style] = s[style];
        return all;
      }, {})(styles)
    };
  };
};

var toComponentObject = function toComponentObject(h) {
  return reduce(function (all, component) {
    all[component.base] = createComponent(h, component);
    return all;
  }, {});
};

var createComponents$1 = function createComponents(h) {
  return function (s) {
    return compose(pickBy(isNotComponentStyle), merge(s), toComponentObject(h), map(addStyleNames(s)), toPairs, groupBy(getBase), filter(isComponent), keys)(s);
  };
};

var isComponent = function isComponent(value) {
  return (/[A-Z]/.test(value[0])
  );
};
var isNotComponentStyle = function isNotComponentStyle(value) {
  return value.indexOf('---') === -1;
};
var getBase = function getBase(string) {
  return string.split('---')[0];
};

module.exports = createComponents$1;
