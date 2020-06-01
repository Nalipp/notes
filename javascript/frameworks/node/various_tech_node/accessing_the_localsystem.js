****************************************************************************************************
accessing the local system


****************************************************************************************************
processes examples

  process.stdin    // readable
  process.stdout   // writeable
  process.stderr   // writeable

  process.env      // envrionment variables
  process.argv     // arguments

  examples:

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function (chunk) {
      process.stdout.write('result : ' + chunk);
    });

    process.stdin.on('end', function () {
      process.stderr.write('done\n');
    });


****************************************************************************************************
fs examples

  fs.createReadStream()   // allows you to read a file
  fs.createWriteStream()  // allows you to write to the readable stream
  fs.watch()              // watches a file for change s
