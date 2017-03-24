const test = require('tape')

const walkObject = require('../walk-object')

test('walkObject', function(t) {
  const obj = {
    fruit: {
      description: 'apple',
      color: [
        {
          description: 'red',
          types: [
            {description: 'fuji'},
            {description: 'golden'},
          ],
          sizes: [
            {description: 'large'},
            {description: 'small'}
          ],
          regions: [
            {description: 'WA'},
            {description: 'OR'},
          ]
        }
      ]
    }
  }

  const results = []

  const fn = function(val) {
    results.push(val)
  }

  walkObject(obj, fn),

  t.deepEqual(
    results,
    ['apple', 'red', 'fuji', 'golden', 'large', 'small', 'WA', 'OR'],
    'Should walk the object'
  )

  t.end()
})
