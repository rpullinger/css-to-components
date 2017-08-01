import {
  groupBy,
  compose,
  keys,
  filter,
  toPairs,
  map,
  reduce,
  pickBy,
  merge
} from './helpers';

import createComponent from './create-component';

const addStyleNames = s => ([base, styles]) => ({
  base,
  styles: reduce((all, style) => {
    all[style] = s[style];
    return all;
  }, {})(styles)
});

const toComponentObject = h =>
  reduce((all, component) => {
    all[component.base] = createComponent(h, component);
    return all;
  }, {});

export const createComponents = h => s =>
  compose(
    pickBy(isNotComponentStyle),
    merge(s),
    toComponentObject(h),
    map(addStyleNames(s)),
    toPairs,
    groupBy(getBase),
    filter(isComponent),
    keys
  )(s);

const isComponent = value => /[A-Z]/.test(value[0]);
const isNotComponentStyle = value => value.indexOf('---') === -1;
const getBase = string => string.split('---')[0];

export default createComponents;
