module.exports = {
  name: 'Remove duplicates',
  iterations: 1000,
  // For the idea, see http://jsben.ch/
  setup: () => {
    Array.prototype.shuffle = function() {
      for (let i = this.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this[i], this[j]] = [this[j], this[i]];
      }
      return this;
    }

    return {
      a: Array.from({ length: 1000 })
        .map((_, i) => [i, i])
        .reduce(((x, y) => [...x, ...y]))
        .shuffle()
    }
  },
  beforeEach: (r) => {
    return r
  },
  afterEach: (r) => {
    return r
  },
  tests: [
    {
      name: 'Set => Array',
      test: (r) => {
        return [...(new Set(r.a))]
      }
    },
    {
      name: 'Object from keys => Array',
      description: 'Apparently, Object keys automatically converts to String',
      test: (r) => {
        const o = {}
        r.a.map((x) => o[x] = null)
        return Object.keys(o).map(Number)
      }
    },
    {
      name: 'Filter to keep ordering',
      test: (r) => {
        return r.a.filter((x, i, v) => v.indexOf(x) == i)
      }
    }
  ]
}