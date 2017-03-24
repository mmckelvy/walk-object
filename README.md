# is-pure-object
A simple function that checks whether an object is actually a pure object.

```
const isObject = require('is-pure-object')

isObject({a: 1}) // true
isObject({}) // true
isObject({a: ['foo']}) // true

isObject(null) // false
isObject('foo') // false
isObject(['foo', 'bar']) // false
isObject(function() {}) // false
```

## Installation
```
npm install --save is-pure-object
```

## Test
```
npm test
```

## License
MIT
