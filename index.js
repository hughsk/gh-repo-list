var parseLink = require('parse-link-header')
var through   = require('through2').obj
var json      = require('JSONStream')
var request   = require('hyperquest')

exports.user = listURL(true, function(user) {
  return 'https://api.github.com/users/' + user + '/repos'
})

exports.org = listURL(true, function(org) {
  return 'https://api.github.com/orgs/' + org + '/repos'
})

exports.all = listURL(false, function(org) {
  return 'https://api.github.com/repositories'
})

function listURL(required, startURL) {
  return function getRepos(token, user) {
    if (required && user.indexOf('/') !== -1) return done(new Error(
      'Username may not contain a "/" character'
    ))

    var stream  = through()
    var start   = startURL(user)
    var headers = {
      'User-Agent': 'ghrepos',
    }

    if (token) {
      headers.Authorization = ['token', token].join(' ')
    }

    grab(start)

    return stream

    function grab(uri) {
      var req = request(uri, { headers: headers })

      req.once('end', next)
        .pipe(json.parse([true]))
        .pipe(stream, { end: false })

      function next() {
        var links = parseLink(req.response.headers.link)
        if (links.next) return grab(links.next.url)
        stream.push(null)
      }
    }
  }
}
