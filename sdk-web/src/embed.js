(function(w, d, id, tag) {
  w.c = w.c || {
    u: null,
    q: [],
    s: '',
    setUser: function(u) {
      this.u = u
    },
    event: function(e, args) {
      const now = new Date()
      this.q.push([now.getTime(), e, args])
    },
    pageview: function(args) {
      this.event('pageview', {
        location: window.location.href,
        referrer: document.referrer,
      })
    },
    init: function(options) {
      this.s = options.server
    }
  }

  const exist = d.getElementById(id)
  if (exist) return

  const script = d.createElement(tag)
  script.id = id
  script.async = true
  script.src = 'https://storage.googleapis.com/hani-companion/analytics.js'

  const sibling = d.getElementsByTagName(tag)[0]
  sibling.parentNode.insertBefore(script, sibling)
})(window, document, 'companion', 'script')
