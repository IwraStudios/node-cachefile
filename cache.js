var cachedFiles = {};
//Every key has (key: {filecontent: data, filepath: /x/amp.le, timestamp: date.then})

module.exports = {
    //Example FS.AddFileToCache('welcome', '/README.md');
    AddFileToCache: function (name, filerpath) {
        return new Promise(function (resolve, reject) {
            var fs = require('fs');
            fs.readFile(__dirname + filerpath, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                cachedFiles[name] = new Object;
                cachedFiles[name]['content'] = data;
                cachedFiles[name]['path'] = filerpath;
                cachedFiles[name]['timestamp'] = Date.now();
            });
            resolve();
        });
    },

    SyncCache: function () {
        return new Promise(function (resolve, reject) {
            var fs = require('fs');
            for (file in cachedFiles) {
                fs.readFile(__dirname + cachedFiles[file]['path'], 'utf8', function (err, data) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    cachedFiles[file]['content'] = data;
                    cachedFiles[file]['timestamp'] = Date.now();
                });
            }
            resolve();
        });
    },

    cachedFiles: cachedFiles


};