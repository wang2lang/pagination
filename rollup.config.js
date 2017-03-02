import fs from 'fs'
import buble from 'rollup-plugin-buble'
import css from 'rollup-plugin-css-only'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/index.js',
  plugins: [
    css({
      output: function (styles, styleNodes) {
        fs.writeFile('dist/styles.css', styles, function (err) {
          if (err) throw err
        })
      }
    }),
    buble(),
    uglify()
  ],
  format: 'cjs',
  dest: 'dist/index.js'
}
