const isObject = require('is-pure-object')

/**
* @param {object} root - The object to walk
* @param {function} fn - A function to call on each leaf node
* @param {function} nodeFn - A function to call on each non-leaf node
*/
module.exports = function walkObject(root, fn, nodeFn) {
  function walk(obj, location = []) {
    Object.keys(obj).forEach((key) => {

      // Value is an array, call walk on each item in the array
      if (Array.isArray(obj[key])) {
        obj[key].forEach((el, j) => {
          if (nodeFn) nodeFn(el, key)
          walk(el, [...location, ...[key], ...[j]])
        })

      // Value is an object, walk the keys of the object
      } else if (isObject(obj[key])) {
        if (nodeFn) nodeFn(obj[key], key)
        walk(obj[key], [...location, ...[key]])

      // We've reached a leaf node, call fn on the leaf with the location
      } else {
        fn(obj[key], [...location, ...[key]])
      }
    })
  }

  walk(root)
}
