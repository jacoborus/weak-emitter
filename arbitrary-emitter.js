'use strict'

module.exports = function () {
  const links = new Map()

  function createNewLink (key) {
    const link = new Set()
    links.set(key, link)
    return link
  }

  return {
    add (key, method) {
      const link = links.get(key) || createNewLink(key)
      link.add(method)
      let isSubscribed = true
      return () => {
        if (isSubscribed) {
          link.delete(method)
          isSubscribed = false
        }
      }
    },

    addOnce (key, method) {
      const link = links.get(key) || createNewLink(key)
      const wrap = {}
      const fn = () => {
        method()
        wrap.remove()
      }
      link.add(fn)
      wrap.remove = () => {
        link.delete(fn)
      }
    },

    trigger (key) {
      const link = links.get(key)
      if (!link) return
      link.forEach(fn => fn())
    },

    remove (key) {
      links.delete(key)
    }
  }
}
