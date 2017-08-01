export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));
export const filter = func => array => array.filter(func);
export const map = func => array => array.map(func);
export const reduce = (func, initial) => array => array.reduce(func, initial);
export const prepend = value => array => array.slice().unshift(value);
export const keys = Object.keys;
export const merge = object1 => object2 => Object.assign({}, object1, object2);
export const join = divider => array => array.join(divider);
export const toPairs = object => map(key => [key, object[key]])(keys(object));
export const dissoc = prop => object => {
  const newObject = Object.assign({}, object);
  delete newObject[prop];
  return newObject;
};
export const pickBy = func => object =>
  reduce((all, key) => {
    if (func(key)) all[key] = object[key];
    return all;
  }, {})(keys(object));
export const groupBy = func => array =>
  reduce((all, key) => {
    const base = func(key);
    all[base] = all[base] ? [...all[base], array[key]] : [array[key]];
    return all;
  }, [])(array);
