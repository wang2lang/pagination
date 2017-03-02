import buble from 'rollup-plugin-buble'
import css from 'rollup-plugin-css-only'
import fs from 'fs'

export default {
  entry: 'example/index.js',
  format: 'cjs',
  plugins: [
    css({
      output (styles, styleNodes) {
        fs.writeFile('example/dist/styles.css', styles, function (err) {
          if (err) throw err
        })
      }
    }),
    buble()
  ],
  dest: 'example/dist/index.js'
}
