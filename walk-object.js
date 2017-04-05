const isObject = require('is-pure-object')

/**
* @param {object} root - The object to walk
* @param {function} fn - A function to call on each node
*/
module.exports = function walkObject(root, fn) {
  function walk(obj, location = []) {
    Object.keys(obj).forEach((key) => {

      // Value is an array, call walk on each item in the array
      if (Array.isArray(obj[key])) {
        obj[key].forEach((el, j) => {
          fn({
            value: el,
            key: `${key}:${j}`,
            location: [...location, ...[key], ...[j]],
            isLeaf: false
          })

          walk(el, [...location, ...[key], ...[j]])
        })

      // Value is an object, walk the keys of the object
      } else if (isObject(obj[key])) {
        fn({
          value: obj[key],
          key,
          location: [...location, ...[key]],
          isLeaf: false
        })
        walk(obj[key], [...location, ...[key]])

      // We've reached a leaf node, call fn on the leaf with the location
      } else {
        fn({
          value: obj[key],
          key,
          location: [...location, ...[key]],
          isLeaf: true
        })
      }
    })
  }

  walk(root)
}
