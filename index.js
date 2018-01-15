

// Cloud Foundry App Instande Index
var index = parseInt(process.env.INSTANCE_INDEX);

var mem = [];

var maxBlocks = 1024;

console.log('APP INDEX: ' + index);

schedule();

function schedule() {
  setTimeout(doTask, 10000);
}

function showLog(msg) {
  console.log('[' + index + '] ' + msg)
}

function doTask() {

  showLog('DO TASK');

  // Task depends on which index we are
  switch(index) {
    case 1:
      allocateMemory();
      break;
    default:
      showLog('Looping....')
      break;
  }
  schedule();
}

function allocateMemory() {
  showLog("Allocating memory.....");
  // 0.5MB
  var block = new Buffer(512*1024);
  mem.push(block);
  log("Allocated " + (mem.length * 0.5) + " MB");

  if(mem.length >= maxBlocks) {
    mem = [];
    log('Freeing allocated memory');
  }
}
