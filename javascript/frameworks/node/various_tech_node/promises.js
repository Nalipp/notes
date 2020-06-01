// you don't have to worry about callbacks being called more than once
// a promise can handle two functions, such as one for a successful result and one for errors

  // a promise uses two arguments resolve and reject
  // instead of using callbacks the result of a promise can be accessed with 'then' after it returns data
  // instead of using if (error) use 'reject'
  // instead of using else return data use 'resolve'
  // 'resolve' is executed in the first function in the then function 'reject' is the second function
  // once 'resolve' or 'reject' is called it can't be called again (unlike a callback() which can accidently be called multiple times)

  // a promise is considered 'pending' when waiting for the result
  // a promise is considered 'settled' it has been set to either 'resolve' or 'reject'

// example: 1

  var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success data');
      reject('error data');
    }, 500)
  });

  somePromise.then((message) => {
    console.log('Success: ' + message);
  }, (errorMessage) => {
    console.log('Error: ' + errorMessage);
  });


// example: 2

  var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
      if (typeof a === 'number' && typeof b === 'number')
        resolve(a + b);
      else 
        reject('the arguments must be numbers');
    });
  }

  asyncAdd(1, 2).then((result) => {
    console.log('Result: ' + result);
  }, (errorMessage) => {
    console.log('Error: ' + errorMessage);
  });


// example: 3
// promise chaining
// the function needs to be returned from the first '.then' so that a second '.then' can be called
// the '.catch' will catch an error if either of the asyncAdd() calls have an error 

  var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
      if (typeof a === 'number' && typeof b === 'number')
        resolve(a + b);
      else 
        reject('the arguments must be numbers');
    });
  }

  asyncAdd(4, 2).then((result) => {
    console.log('Result1: ' + result);
    return asyncAdd(result, 33);
  }).then((result) => {
    console.log('Result2', result);
  }).catch((errorMessage) => {
    console.log('Error:', errorMessage); 
  });


// example: 4
// throw error can be accessed in 'catch()' with .message

const encodedAddress = encodeURIComponent(argv.a);
const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geoUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('unable to find that address');
  }
  console.log(response.data);
}).catch((error) => {
  if (error.code === 'ENOTFOUND') 
    return console.log('server not found'); 
  console.log(error.message);
});


