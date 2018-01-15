var os = require('os');

// Cloud Foundry App Instande Index
var index = parseInt(process.env.INSTANCE_INDEX);

var mem = [];

log('APP INDEX: ' + index);

var freeMemory = Math.round(os.freemem() / 1024 / 1024);
log('Free Memory: ' + freeMemory + ' MB');

var maxBlocks = freeMemory * 2;
log('Max Blocks: ' + maxBlocks);

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
    default:
      log('Looping....')
      break;
  }
  schedule();
}

function allocateMemory() {
  log("Allocating memory.....");
  // 0.5MB
  // Each element in teh array is 8 bytes
  var block = new Array(1024 * 1024 / 8);
  mem.push(block);
  log("Allocated " + (mem.length) + " MB");

  if(mem.length >= maxBlocks) {
    mem = [];
    log('Freeing allocated memory');
  }

  // var freeMemory = Math.round(os.freemem() / 1024 / 1024);
  // log('Free Memory: ' + freeMemory);
    
}
