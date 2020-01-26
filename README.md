# js-benchmark

A simple suite to test benchmark for Node.js and web browser

## Tests

For Node version, see [/results](/results)

For browser version, see <https://patarapolw.github.io/js-benchmark>

## Inspiration

<https://stackoverflow.com/questions/111368/how-do-you-performance-test-javascript-code>

## Creating your own test

### Node version

- Clone this project
- Run `npm install` or `yarn install`
- Write test suite in `/node/suite.js`
- Run `npm start` or `yarn start`

### Browser version

- Fork this project
- Clone to your computer
- Run `npm install` or `yarn install`
- Write test suites in [/browser/tests](/browser/tests)
- Run `npm run browser:create` or `yarn browser:create` to create `/dist` folder
- Open `/dist/index.html` to view your results
- To deploy to GitHub Pages, simply rum `npm run deploy` or `yarn deploy`
