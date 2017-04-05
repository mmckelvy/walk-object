const test = require('tape')

const walkObject = require('../walk-object')

test('walkObject', function(t) {
  const obj = {
    order: {
      number: 243,
      customer: {
        name: 'John Smith',
        email: 'j@smith.com',
        city: 'LA'
      },
      items: [
        {
          fruit: 'apple',
          color: 'red',
          regions: [
            {
              state: 'Washington',
              city: 'Redmond'
            },
            {
              state: 'Maine',
              city: 'Portland'
            }
          ]
        },
        {
          fruit: 'grape',
          color: 'purple',
          regions: [
            {
              state: 'California',
              city: 'Sonoma'
            },
            {
              state: 'Oregon',
              city: 'Willamette'
            }
          ]
        }
      ]
    }
  }

  // Log both values and locations
  const valuesAndLocations = []
  function logValuesAndLocations({ value, key, location, isLeaf }) {
    if (isLeaf) valuesAndLocations.push({value, location})
  }

  walkObject(obj, logValuesAndLocations)

  // Log values only
  const values = []
  function logValues({ value, isLeaf }) {
    if (isLeaf) values.push(value)
  }

  walkObject(obj, logValues)

  // Log keys of non-leaf nodes only
  const keys = []
  function logKeys({ key, isLeaf }) {
    if (!isLeaf) keys.push(key)
  }

  walkObject(obj, logKeys)

  t.deepEqual(
    valuesAndLocations,
    [
      {
        value: 243,
        location: ['order', 'number']
      },
      {
        value: 'John Smith',
        location: ['order', 'customer', 'name']
      },
      {
        value: 'j@smith.com',
        location: ['order', 'customer', 'email']
      },
      {
        value: 'LA',
        location: ['order', 'customer', 'city']
      },
      {
        value: 'apple',
        location: ['order', 'items', 0, 'fruit']
      },
      {
        value: 'red',
        location: ['order', 'items', 0, 'color']
      },
      {
        value: 'Washington',
        location: ['order', 'items', 0, 'regions', 0, 'state']
      },
      {
        value: 'Redmond',
        location: ['order', 'items', 0, 'regions', 0, 'city']
      },
      {
        value: 'Maine',
        location: ['order', 'items', 0, 'regions', 1, 'state']
      },
      {
        value: 'Portland',
        location: ['order', 'items', 0, 'regions', 1, 'city']
      },
      {
        value: 'grape',
        location: ['order', 'items', 1, 'fruit']
      },
      {
        value: 'purple',
        location: ['order', 'items', 1, 'color']
      },
      {
        value: 'California',
        location: ['order', 'items', 1, 'regions', 0, 'state']
      },
      {
        value: 'Sonoma',
        location: ['order', 'items', 1, 'regions', 0, 'city']
      },
      {
        value: 'Oregon',
        location: ['order', 'items', 1, 'regions', 1, 'state']
      },
      {
        value: 'Willamette',
        location: ['order', 'items', 1, 'regions', 1, 'city']
      },
    ],
    'Should walk the object'
  )

  t.deepEqual(
    values,
    [
      243,
      'John Smith',
      'j@smith.com',
      'LA',
      'apple',
      'red',
      'Washington',
      'Redmond',
      'Maine',
      'Portland',
      'grape',
      'purple',
      'California',
      'Sonoma',
      'Oregon',
      'Willamette',
    ],
    'Should work with values only'
  )

  t.deepEqual(
    keys,
    [
      'order',
      'customer',
      'items:0',
      'regions:0',
      'regions:1',
      'items:1',
      'regions:0',
      'regions:1'
    ],
    'Should call the function on non-leaf nodes'
  )

  t.end()
})
