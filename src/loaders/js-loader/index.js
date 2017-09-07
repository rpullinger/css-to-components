const replacement = /import(.*)from ['"](.*).css['"]/gi;

export default function(source) {
  if (typeof source === 'string') {
    source = `
      import cssToComponents from 'css-to-components/lib/preact';
      ${source}
    `;
    source = source.replace(replacement, (match, p1, p2) => {
      const name = `s${p2.replace(/[/\-/.]/gi, 's')}`;
      return `
        import ${name} from '${p2}.css';
        const ${p1} = cssToComponents(${name});
      `;
    });
  }

  return source;
}
