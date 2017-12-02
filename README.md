# node-cachefile
A very small node module for caching &amp; syncing files to ram with virtually zero downtime

Usage:
```js

var cache = require("cachefile");

cache.AddFileToCache("abcd", "./README.md");
console.log(cache.cachedFiles["abcd"]);
//Update the file
cache.SyncCache();
//Changed output
console.log(cache.cachedFiles["abcd"]);
```

TODO: make it a promise ;)