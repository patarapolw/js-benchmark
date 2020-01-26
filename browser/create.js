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
<div id="result"></div>
<br/>
<small>View source to see more information</small>
<script id="test-suite">${fs.readFileSync(path.join(__dirname, 'tests', f), 'utf8')}</script>
<script id="test-runner">${fs.readFileSync(path.join(__dirname, 'runner.js'), 'utf8')}</script>`
  )

  return f
})

fs.writeFileSync(
  path.join(__dirname, '../dist/index.html'),
  tests.map((f) => `<p><a href="./tests/${f.replace(/.js$/, '.html')}">${f}</a></p>`)
)
