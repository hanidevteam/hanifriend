(function(w, d, objectName) {
  const TRACK_ID_KEY = 'c_track'

  function _setCookie(key, value) {
    const expires = new Date()
    expires.setTime(expires.getTime() + 60 * 60 * 24 * 365 * 2 * 1000)  // 2 years
    document.cookie = `${key}=${value}; expires=${expires.toUTCString()}; path=/`
  }

  function _getCookie(name) {
    const nameEQ = name + '='
    const ca = d.cookie.split(';')
    for (let c of ca) {
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
  }

  function _hex(dec) {
    return dec.toString(16).padStart(2, '0')
  }

  function _randomString(length) {
    const array = new Uint8Array(length / 2)
    w.crypto.getRandomValues(array)
    return Array.from(array, _hex).join('')
  }

  function _getOrCreateTrackID() {
    const trackID = _getCookie(TRACK_ID_KEY)

    if (trackID) {
      return trackID
    } else {
      const trackID = _randomString(40)
      _setCookie(TRACK_ID_KEY, trackID)
      return trackID
    }
  }

  function send(url, data) {
    const xhr = new window.XMLHttpRequest()
    xhr.open('POST', url)
    xhr.send(JSON.stringify(data))
  }

  function init() {
    const old = window[objectName] || {}
    const trackID = _getOrCreateTrackID()

    // read and send from queue
    for (const item of old.q) {
      const payload = {
        trackID,
        user: old.u,
        event: {
          ts: item[0],
          type: item[1],
          attrs: item[2] || {}
        }
      }
      // TODO : batch send
      send(old.s, payload)
    }

    // replace window.c
    window[objectName] = {
      s: old.s || process.env.TRACKING_SERVER,
      q: old.q || [],
      u: old.u,
      init: function(options) {
        this.s = options.server
      },
      setUser: function (user) {
        this.u = user
      },
      _defaultArguments: function () {

      },
      event: function (event, attrs) {
        const trackID = _getOrCreateTrackID()
        const user = this.u
        const data = {
          trackID,
          user,
          event: {
            type: event,
            attrs,
            ts: Date.now()
          }
        }
        send(this.s, data)
      },
      pageview: function (args = {}) {
        this.event('pageview', {
          ...args,
          location: window.location.href,
          referrer: document.referrer,
        })
      }
    }
  }
  init()
})(window, document, 'c')
