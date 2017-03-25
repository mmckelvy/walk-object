# walk-object
Walks an object's keys, calling a function when it reaches a leaf node.

## Example
```
const walkObject = require('walk-object')

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

walkObject(obj, (val) => {
  console.log(val)
})

//
'apple'
'red'
'fuji'
'golden'
'large'
'small'
'WA'
'OR'
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
