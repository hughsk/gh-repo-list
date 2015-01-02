# gh-repo-list
![](http://img.shields.io/badge/stability-experimental-orange.svg?style=flat)
![](http://img.shields.io/npm/v/gh-repo-list.svg?style=flat)
![](http://img.shields.io/npm/dm/gh-repo-list.svg?style=flat)
![](http://img.shields.io/npm/l/gh-repo-list.svg?style=flat)

Stream a list of all repositories for either a particular user/organisation or
all of GitHub.

## Usage

[![NPM](https://nodei.co/npm/gh-repo-list.png)](https://nodei.co/npm/gh-repo-list/)

All methods have a `token` argument for making authenticated requests
with. If you'd like to make unauthenticated requests, use `null` here instead.

### `stream = list.user(token, name)`

Returns an object stream listing all repositories owned by user `name`.

### `stream = list.org(token, name)`

Returns an object stream listing all repositories owned by organisation `name`.

### `stream = list.all(token)`

Returns an object stream listing all public repositories on GitHub ever.

## Example

``` javascript
var list = require('gh-repo-list')
var auth = require('ghauth')

auth({
    configName: 'gh-repo-list'
  , scopes: ['user', 'repo']
}, function(err, authData) {
  if (err) throw err

  var stream = list.user(authData.token, 'mikolalysenko')

  stream.on('data', function(repo) {
    console.log(repo.full_name)
  })

  stream.on('end', function() {
    console.log('done!')
  })
})
```

## License

MIT. See [LICENSE.md](http://github.com/hughsk/gh-repo-list/blob/master/LICENSE.md) for details.
