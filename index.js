var os = require('os');
var fs = require('fs');

// Cloud Foundry App Instande Index
var index = parseInt(process.env.INSTANCE_INDEX);

var mem = [];
var disk = 0;

log('APP INDEX: ' + index);

var freeMemory = Math.round(os.freemem() / 1024 / 1024);
log('Free Memory: ' + freeMemory + ' MB');

var maxBlocks = 100;

schedule();

function schedule() {
  setTimeout(doTask, 5000);
}

function log(msg) {
  console.log('[' + index + '] ' + msg)
}

function doTask() {

  // Task depends on which index we are
  switch(index) {
    case 1:
      allocateMemory();
      break;
    case 2:
      allocateDisk();
      break;
    default:
      log('Looping....')
      break;
  }
  schedule();
}

function allocateMemory() {
  var maxBlocks = freeMemory;
  log('Max Blocks: ' + maxBlocks);
  log("Allocating memory.....");
  // 0.5MB
  // Each element in teh array is 8 bytes
  var block = new Array(1024 * 1024);
  mem.push(block);
  log("Allocated " + (mem.length) + " MB");

  if(mem.length >= maxBlocks) {
    mem = [];
    log('Freeing allocated memory');
  }
}

function allocateDisk() {
  log("Allocating disk.....");
  fs.writeFile('file_' + disk, new Buffer(8*1024*1024));
  disk++;
}