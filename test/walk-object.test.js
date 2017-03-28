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
  function logValuesAndLocations(value, location) {
    valuesAndLocations.push({value, location})
  }

  walkObject(obj, logValuesAndLocations)

  // Log values only
  const values = []
  function logValues(value) {
    values.push(value)
  }

  walkObject(obj, logValues)

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

  t.end()
})

test('walkObject', function(t) {
  const obj = {
    order: {
      number: 323,
      items: [
        {
          sku: 8,
          description: 'shirt'
        },
        {
          sku: 5,
          description: 'pants'
        }
      ]
    }
  }


  // Don't need to do anything with the leaves
  function leafFn(value, location) {
    return
  }

  const node = {}

  function nodeFn(value, location) {
    console.log(location)
    if (value.items) {
      node.value = value,
      node.location = location
    }
  }

  walkObject(obj, leafFn, nodeFn)

  t.deepEqual(
    node,
    {
      value: [
        {
          sku: 8,
          description: 'shirt'
        },
        {
          sku: 5,
          description: 'pants'
        }
      ],
      location: ['order', 'items']
    },
    'Should get the appropriate node values'
  )

  t.end()
})
