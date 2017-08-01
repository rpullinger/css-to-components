const replacement = /import(.*)from ['"](.*).css['"]/gi;

export default function(source) {
  if (typeof source === 'string') {
    source = source.replace(
      replacement,
      (match, p1, p2) => `
        import stylesssss from '${p2}.css';
        import cssToComponents from 'css-to-components';
        const ${p1} = cssToComponents(() => {})(stylesssss);
      `
    );
  }

  return source;
}
