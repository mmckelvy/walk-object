# walk-object
`function walkObject(root, fn)`

Walks an object's keys, calling a function when a leaf node is reached.

param: `{object} root` - The object to walk.

param: `{function} fn` - Function to call on each node.

The function will be passed an object with the following properties:

`value: {any}` - The value of the current node.
`key: {string}` - The key for the current node. If node is an element of an array key will be in the format of `key:index`. See walk-object.test.js for an example.
`location: {array}` - The full location of the current node (see example below).
`isLeaf: {boolean}` - Whether or not the node is a leaf.

You can also pass an optional function to be called on each non-leaf node.

## Example
```
const walkObject = require('walk-object')

const obj = {
  order: {
    number: 123,
    customer: {
      name: 'John Smith'
    },
    items: [
      {
        sku: 456,
        description: 'shirt'
      },
      {
        sku: 789,
        description: 'pants'
      }
    ]
  },
}

walkObject(obj, ({ value, location, isLeaf }) => {
  if (isLeaf) console.log(value, location
})

//
123, ['order', 'number']
'John Smith', ['order', 'customer', 'name']
456, ['order', 'customer', 'items', 0, 'sku']
'shirt', ['order', 'customer', 'items', 0, 'description']
789, ['order', 'customer', 'items', 1, 'sku']
'pants', ['order', 'customer', 'items', 1, 'description']
```

## Installation
```
npm install --save walk-object
```

## Test
```
npm test
```

## License
MIT
