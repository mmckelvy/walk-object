# walk-object
Walks an object's keys, calling a function when it reaches a leaf node.
The function will be passed the leaf node's value and the location (the location will be an array)

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

walkObject(obj, (value, location) => {
  console.log(value, location)
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
