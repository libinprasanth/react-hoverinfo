import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/react-hoverinfo.js',
    format: 'umd',
    name: 'react-hoverinfo',
    globals: {
      react: 'React',
    },
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    postcss({
      plugins: [
        require('postcss-preset-env')({
          browsers: 'last 2 versions',
          stage: 3,
          features: {
            'nesting-rules': true,
          },
        }),
      ],
      inject: true, // Inject styles directly into the bundle
      sourceMap: true,
    }),
  ],
  external: ['react'], // List external dependencies here
}
