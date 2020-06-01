// Things I forgot about javaScript

Number((1.666666).toFixed(3));
  => 1.667

[1, 4, 5, 3, 7].includes(3);
  => true

// rounding can somtimes cause problems
// http://www.jacklmoore.com/notes/rounding-in-javascript/

var largest = Number.MAX_VALUE;
var smallest = -Number.MIN_VALUE;

// slice
arr = [1, 2, 3, 4, 5, 6, 7, 8];
arr.slice(2, 4) 
  => [3, 4] // (makes a copy and dosen't mutate the original arr);
            // starts with the 2 position and returns 2 values because 4 minus 2 is 2
            // works with strings because you are just making copies of a portion of the string
  
// splice
arr = [1, 2, 3, 4, 5, 6, 7, 8];
arr.splice(2, 4) 
  => [3, 4, 5, 6] // essentially cuts out elements from the original arr
                  // starts with the 2 position and cuts out the next 4 (3, 4, 5, 6) permentatly from the original array
                  // returns the cut values
                  // arr is now [1, 2, 7, 8]
                  // does not work with strings because a string is an immutable primitive value (you can only make copies)
                  

break    // breaks out of the current iteration and all remaining iterations
return   // breaks out of the current iteration and returns a value
continue // breaks out of the current iteration and begins the next iteration if there are remaining iterations

// objects, maps, sets
  // objects -> require a string for a key
  // mapps -> can use an integer or even a function for a key
  // sets -> all values must be unique and lookup is similar to a hash talble O(i)

// maps example

  let map = new Map;

    map.set(2, 2);
    map.set('two', 2);
    map.get('two') => 2
    map.has(2)

    // Map { 2 => 1, 3 => 1 }
    map.set(2, map.get(2) + 1)
    // Map { 2 => 2, 3 => 1 }

// sets example

  let set = new Set();
    set.has('hi')
    set.add('')
