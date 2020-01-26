const fs = require('fs')
const path = require('path')

const glob = require('glob')
const rimraf = require('rimraf')

rimraf.sync(path.join(__dirname, '../dist'))
fs.mkdirSync(path.join(__dirname, '../dist'))
fs.mkdirSync(path.join(__dirname, '../dist/tests'))

const tests = glob.sync('*.js', {
  cwd: path.join(__dirname, 'tests')
}).map((f) => {
  fs.writeFileSync(
    path.join(__dirname, '../dist/tests', f.replace(/.js$/, '.html')),
    `
<pre id="result"></pre>
<script src="./${f}"></script>
<script src="../runner.js"></script>`
  )

  fs.copyFileSync(
    path.join(__dirname, 'tests', f),
    path.join(__dirname, '../dist/tests', f),
  )

  return f
})

fs.writeFileSync(
  path.join(__dirname, '../dist/index.html'),
  tests.map((f) => `<p><a href="./tests/${f.replace(/.js$/, '.html')}">${f}</a></p>`)
)

fs.copyFileSync(
  path.join(__dirname, 'runner.js'),
  path.join(__dirname, '../dist/runner.js')
)
