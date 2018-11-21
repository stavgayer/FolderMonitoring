hound = require("hound");
const mongoose = require("mongoose");
const Logs = mongoose.model("Logs");
var fs = require("fs");
var watcher;

function startWatching(folderPath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(folderPath)) {
      let err = new Error("not exist or not valid!");
      reject(err);
    } else {
      watcher = hound.watch(folderPath);
      watcher.on("change", function(file) {
        let newLog = new Logs({ log: `File ${file} has been changed` });
        newLog.save(err => {
          if (err) {
            handleError(reject);
          }
        });
        console.log("File", file, "has been changed");
      });

      watcher.on("create", function(file) {
        let newLog = new Logs({ log: `File ${file} has been added` });
        newLog.save(err => {
          if (err) {
            handleError(reject);
          }
        });
        console.log("File", file, "has been added");
      });

      watcher.on("delete", function(file) {
        let newLog = new Logs({ log: `File ${file} has been removed` });
        newLog.save(err => {
          if (err) {
            handleError(reject);
          }
        });
        console.log("File", file, "has been removed");
      });
      resolve();
    }
  });
}
function stopWatching() {
  return new Promise((resolve, reject) => {
    watcher.clear();
    Logs.deleteMany({}, err => {
      reject(err);
    });
    resolve();
  });
}
function handleError(reject) {
  let err = new Error("Error was occured during saving logs");
  watcher.clear();
  reject(err);
}

module.exports = {
  startWatching,
  stopWatching
};
