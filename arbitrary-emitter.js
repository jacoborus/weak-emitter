'use strict'

module.exports = function () {
  const links = new Map()

  function createNewLink (key) {
    const link = new Set()
    links.set(key, link)
    return link
  }

  function add (key, method) {
    const link = links.get(key) || createNewLink(key)
    link.add(method)
    let isSubscribed = true
    return () => {
      if (isSubscribed) {
        link.delete(method)
        isSubscribed = false
      }
    }
  }

  function trigger (key) {
    const link = links.get(key)
    if (!key) return
    link.forEach(fn => fn())
  }

  return { add, trigger }
}
