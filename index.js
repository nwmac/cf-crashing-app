

// Cloud Foundry App Instande Index
var index = parseInt(process.env.INSTANCE_INDEX);

var mem = [];

var maxBlocks = 40;

console.log('APP INDEX: ' + index);

while (true) {
  setTimeout(doTask, 10000);
}

function log(msg) {
  console.log('[' + index + '] ' + msg)
}

function doTask() {

  log('DO TASK');

  // Task depends on which index we are
  switch(index) {
    case 1:
      allocateMemory();
      break;
    default:
      log('Looping....')
      break;
  }

  function allocateMemory() {
    // 0.5MB
    var block = new Buffer(512*1024*1024);
    mem.push(block);
    log("Allocated " + (mem.length * 0.5) + " MB");

    if(mem.length >= maxBlocks) {
      mem = [];
      log('Freeing allocated memory');
    }
  }

}