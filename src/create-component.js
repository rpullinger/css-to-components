import { compose, join, prepend, map, toPairs, dissoc } from './helpers';

const trimFalse = classname => classname.replace(/-false$/, '');
const trimTrue = classname => classname.replace(/-true$/, '');
const toClassName = base => ([key, value]) => `${base}---${key}-${value}`;

const createComponent = (h, { base = '', styles = [] }) => ({
  className,
  tag = 'div',
  ...props
}) => {
  const componentProps = toPairs(props).map(([key, value]) => {
    const isCSSProp = compose(
      key => styles[key],
      trimFalse,
      trimTrue,
      toClassName(base)
    )([key, value]);

    if (isCSSProp) {
      return null;
    }
    return key;
  });

  const propsToAdd = {};
  componentProps.forEach(prop => {
    propsToAdd[prop] = props[prop];
  });

  const component = h(tag, {
    ...propsToAdd,
    className: compose(
      join(' '),
      prepend(className),
      prepend(styles[base]),
      map(compose(key => styles[key], trimFalse, trimTrue, toClassName(base))),
      toPairs,
      dissoc('children')
    )(props)
  });
  component.displayName = base;
  return component;
};

export default createComponent;
