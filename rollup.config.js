// import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const base = {
  format: 'cjs',
  plugins: [
    // resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};

export default [
  Object.assign({}, base, {
    entry: 'src/index.js',
    dest: 'lib/bundle.js'
  }),
  Object.assign({}, base, {
    entry: 'src/preact.js',
    dest: 'lib/preact/index.js',
    external: ['preact']
  }),
  Object.assign({}, base, {
    entry: 'src/loaders/js-loader/index.js',
    dest: 'lib/js-loader/index.js'
  }),
  Object.assign({}, base, {
    entry: 'src/loaders/css-loader/index.js',
    dest: 'lib/css-loader/index.js'
  })
];
