'use strict'

module.exports = function () {
  const links = new Map()

  function createNewLink (key) {
    const link = new Set()
    links.set(key, link)
    return link
  }

  const apply = Function.prototype.apply

  return {
    on (key, method) {
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

    once (key, method) {
      const link = links.get(key) || createNewLink(key)
      link.add(fn)
      const rm = () => link.delete(fn)
      function fn () {
        method(arguments)
        rm()
      }
    },

    emit (key) {
      const link = links.get(key)
      if (!link) return
      if (arguments.length > 1) {
        let args = arguments.slice(1)
        link.forEach(fn => apply.call(fn, args))
      } else {
        link.forEach(fn => fn())
      }
    },

    off (key, action) {
      if (1 in arguments) {
        let link = links.get(key)
        if (link) link.delete(action)
      } else {
        links.delete(key)
      }
    }
  }
}
