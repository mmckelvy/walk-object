const test = require('tape')

const isObject = require('../is-object')

test('isObject', function(t) {
  const obj = {a: 1}
  const empty = {}
  const objWithArr = {a: ['foo', 'bar']}
  const str = 'hello world'
  const arr = ['foo', 'bar']
  const foo = null
  const fn = function() {}

  t.ok(isObject(obj), 'Should return true for an object')
  t.ok(isObject(obj), 'Should return true for an empty object')
  t.ok(isObject(obj), 'Should return true for an object with an array as a value')
  t.notOk(isObject(str), 'Should return false for a string')
  t.notOk(isObject(arr), 'Should return false for an array')
  t.notOk(isObject(arr), 'Should return false for an null')
  t.notOk(isObject(arr), 'Should return false for a function')

  t.end()
})
