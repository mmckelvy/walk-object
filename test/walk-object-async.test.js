const test = require('tape')

const { walkObject, walkObjectAsync } = require('../index')

test('walkObjectAsync', async function(t) {
  const obj = {
    order: {
      number: 243,
      customer: {
        name: 'John Smith',
        email: 'j@smith.com',
        city: 'LA'
      },
      items: [
        {color: 'blue'},
        {color: 'red'}
      ]
    }
  }

  const vals = []
  const asyncVals = []

  function save({ value, location, key, isLeaf }) {
    vals.push({value, location, key, isLeaf})
  }

  async function asyncSave({ value, location, key, isLeaf }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        asyncVals.push({value, location, key, isLeaf})
        resolve()
      }, 250)
    })
  }

  // Create the baseline values
  walkObject(obj, save)
  await walkObjectAsync(obj, asyncSave)

  t.deepEqual(
    asyncVals,
    vals,
    'Should log the correct values asynchronously'
  )

  t.end()
})
