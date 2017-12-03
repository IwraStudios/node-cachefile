# node-cachefile
A very small node module for caching &amp; syncing files to ram with virtually zero downtime

Recommended with small-file/web servers

`var cache = require("cachefile");` can also be `var cache = require("./cache");` depending on the way you import it

`SyncCache` Will give a promise for every file, so you can keel track of what is going on with something like:

```js

Promise.all(cache.SyncCache()).then(values => { 
  console.log(values);//All were loaded correctly
}).catch(reason => { 
  console.log(reason)l //Some coulnd't be loaded
});


```

Or with more control:

```js
var promises = cache.SyncCache();
for(promi in promises){
    promi.then(path =>{
        console.log("updated: " + path)
    }).catch( err =>{
        console.log("Failed to update file: ", err)
    });
}

```


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
Promise.all(cache.SyncCache()).then(() =>{
    //Changed output
    console.log(cache.cachedFiles["abcd"]);
});
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