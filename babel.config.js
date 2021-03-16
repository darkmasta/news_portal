module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      polyfills: [
        'es.array.fill',
        'es.array.iterator',
        'es.object.assign',
        'es.object.keys',
        'es.object.values',
        'es.promise',
        'es.string.includes',
        'es.symbol',
        'es.weak-map',
        'es.array.includes',
        'es.object.entries',
        'es.promise.finally',
        'es.symbol.async-iterator',
        'es.number.is-nan',
        'es.math.trunc'
      ],
      corejs: 3
    }]
  ]
}
