# node-cachefile
A very small node module for caching &amp; syncing files to ram with virtually zero downtime

Recommended with small-file/web servers

`var cache = require("cachefile");` can also be `var cache = require("./cache");` depending on the way you import it

npm not yet available

You can see the last synctime(Unix epoch) like this:
```js
cache.cachedFiles["name"]["timestamp"];
or
cache.cachedFiles["name"].timestamp;
```


Usage:
```js

var cache = require("cachefile");

cache.AddFileToCache("abcd", "./README.md").then(() =>{
    console.log(cache.cachedFiles["abcd"]);
});

//Do some stuff that takes some time

//Update the file
cache.SyncCache();
//Changed output
console.log(cache.cachedFiles["abcd"]);
```

WebServer implication:
```js
var cache = require("cachefile");
var async = require("async");

cache.AddFileToCache("abcd", "./README.md");

function UpdateRoutine() {
    async.parallel([
        cache.SyncCache,
        SomeOtherFunction
    ]);
    setTimeout(UpdateRoutine, 60000);//You should use a diffrent function
    console.log("Did periodic routine: ", new Date().toString("yyyyMMddHHmmss"));
}

//cached pages auto update
setTimeout( UpdateRoutine,5000);

///Serve a file like so
        response.write(cache.cachedFiles["abcd"], "binary");
///The webserver will update the file every 60 seconds
///Without every haveing the file unavailable

```