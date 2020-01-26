var results = (() => {
  const r = suite.setup()
  return Array.from({ length: suite.iterations }).map(() => {
    return suite.tests.map((t) => {
      if (t.test) {
        const r0 = testDuration(() => {
          return suite.afterEach(t.test(suite.beforeEach(r)))
        })
        t.duration = [] || t.duration
        t.duration.push(r0.duration)
        return r0.result
      }
    })
  })
})()

console.dir(results[0], { depth: null })

document.getElementById('result').innerText += `Test: ${suite.name}\n\n`

suite.tests.map((el) => {
  el.duration = el.duration.reduce((a, b) => a + b) / el.duration.length
  document.getElementById('result').innerText += `${el.name} takes ${el.duration.toFixed(3)} msec each\n`
})

document.getElementById('result').innerText += '\n'

const fastest = suite.tests.sort((a, b) => a.duration - b.duration)[0]
document.getElementById('result').innerText += `The fastest is ${fastest.name} by ${fastest.duration.toFixed(3)} msec`

/**
 * Most browsers are now implementing high resolution timing in performance.now(). It's superior to new Date() for performance testing because it operates independently from the system clock.
 *
 * https://stackoverflow.com/a/24834846/9023855
 *
 * @param {Function} test 
 */
function testDuration (testFn) {
  const start = performance.now()
  const result = testFn()
  return {
    result,
    duration: performance.now() - start
  }
}
