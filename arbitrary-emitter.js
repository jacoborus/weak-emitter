'use strict'

function arbitrary () {
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
        rm()
        method(arguments)
      }
    },

    emit (key) {
      const link = links.get(key)
      if (!link) return
      const l = arguments.length
      switch (l) {
        case 1: {
          link.forEach(fn => fn())
          break
        }
        case 2: {
          link.forEach(fn => fn(arguments[1]))
          break
        }
        case 3: {
          link.forEach(fn => fn(arguments[1], arguments[2]))
          break
        }
        default: {
          let l = arguments.length
          let args = new Array(l - 1)
          for (let i = 1; i < l; ++i) {
            args[i - 1] = arguments[i]
          }
          link.forEach(fn => apply.call(fn, fn, args))
        }
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

module.exports = arbitrary
