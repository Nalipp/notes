****************************************************************************************************
readable writeable pipe streams
diffrence between reading and streaming


****************************************************************************************************
readable writeable pipe streams

  const request = require('request');
  const fs = require('fs');
  const zlib = require('zlib');

  const korbit = request('https://api.korbit.co.kr/v1/ticker');
  const coinbase = request('https://api.coinbase.com/v2/prices/BTC-USD/buy');
  const exchangeRate = request('https://api.coinbase.com/v2/exchange-rates?currency=BTC');

  // readable streams
  korbit.on('start', function() {
    console.log('starting');
  });

  korbit.on('data', function(chunk) {    // returns data in limited chunks
    console.log(chunk); 
    console.log(String(chunk)); 
  });

  korbit.on('end', function() {
    console.log('done');
  });


  // writeable streams
  console.log(process.stdout.writable);  // writeable true
  console.log(process.stderr.writable)   // writeable true
  console.log(process.stdin.writable)    // writeable false

  process.stdout.write('hello');  // hello
  process.stderr.write('hello');  // hello
  process.stdin.write('hello');   // hello

  korbit.on('data', function(chunk) {  // long version without pipe
    process.stdout.write(chunk.js);
  });


  // piping data between streams
  korbit.pipe(process.stdout);                                      // write stream
  korbit.pipe(fs.createWriteStream('file.json'));                   // write to a file
  korbit.pipe(fs.createWriteStream('file.json', {flags: 'a'}));     // append to a file

    // you can also chain multiple pipes together
    exchangeRate.pipe(zlib.createGzip()).pipe(fs.createWriteStream('file.json.gz'));
      // gzip -cd file.json.gz


****************************************************************************************************
diffrence between reading and streaming

  fs.readFileSync(<filename>)      // reads a file syncronously
  fs.readFile(<filename>)          // reads a file asyncronously
  fs.writeFileSync(<filename>)     // writes a file syncronously
  fs.writeFile(<filename>)         // writes a file asyncronously
  
  fs.createReadStream(<filename>)  // reads a file stream
  fs.createWriteStream(<filename>) // writes to a file stream

  differences between accesing a file through a stream and through a file
    fs.file reads the file in one big chunck and hold the entire chunk in memory which can be a problem for large types of data
      also you have to wait until all data is recieved to do anything with it
    fs.stream can be piped into different forms and does not require the entire file download to be completed 

  
