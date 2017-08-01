export default function(source) {
  if (typeof source === 'string') {
    source = source.replace(/(\.[A-Z].*){/g, (match, p1) => {
      return match.replace('[', '---').replace(']', '').replace('=', '-');
    });
  }

  return source;
}
