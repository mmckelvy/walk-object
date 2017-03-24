const isObject = require('is-pure-object')

/**
* @param {object} root - The object to walk
* @param {function} fn - A function to call on each node leaf
*/
module.exports = function walkObject(root, fn) {
  function walk(obj) {
    Object.keys(obj).forEach((key) => {
      // Value is an array, call walk on each item in the array
      if (Array.isArray(obj[key])) {
        obj[key].forEach((el) => {
          walk(el)
        })
      // Value is an object, walk the keys of the object
      } else if (isObject(obj[key])) {
        walk(obj[key])
      // We've reached a leaf node, call fn on the leaf
      } else {
        fn(obj[key])
      }
    })
  }

  walk(root)
}

