var ghauth  = require('ghauth')
var test    = require('tape')
var ghrepos = require('./')
var auth    = null

test('first off: authentication', function(t) {
  ghauth({
      configName: 'ghrepos'
    , scopes: ['user', 'repo']
  }, function(err, _auth) {
    if (err) return t.ifError(err)
    auth = _auth
    t.pass('authenticated successfully')
    t.end()
  })
})

test('repos.user', function(t) {
  var repos = userRepos2 = []
  var count = 0

  ghrepos.user(auth.token, 'hughsk')
    .on('data', function(repo) {
      repos.push(repo)
      count++
    })
    .once('error', t.ifError)
    .once('end', function() {
      t.ok(count > 200, '>200 repos for hughsk')
      t.end()
    })
})
