const isObject = require('is-pure-object')

module.exports = async function walkObjectAsync(root, fn) {
  async function walk(obj, location = []) {
    const keys = Object.keys(obj)

    for (let key of keys) {
      if (Array.isArray(obj[key])) {
        for (let [ index, el ] of obj[key].entries()) {
          await fn({
            value: el,
            key: `${key}:${index}`,
            location: [...location, ...[key], ...[index]],
            isLeaf: false
          })
          await walk(el, [...location, ...[key], ...[index]])
        }
      } else if (isObject(obj[key])) {
        await fn({
          value: obj[key],
          key,
          location: [...location, ...[key]],
          isLeaf: false
        })
        await walk(obj[key], [...location, ...[key]])
      } else {
        await fn({
          value: obj[key],
          key,
          location: [...location, ...[key]],
          isLeaf: true
        })
      }
    }
  }

  return await walk(root)
}
