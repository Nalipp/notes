******************************************************************************************
es6
******************************************************************************************

  *const
  *let
  *arrow functions
  *for of loops
  *rest opperator
  *destructuring (objects and arrays)
  *class
  *inheritance
  *maps
  *sets
  *promises


****************************************************************************************************
*const

  prevents to from redeclaring a primitive varialbe
    primitive data types cannot be changes (this includes strings, numbers, pretty much everything except objects)
    objects can have their values redefined (this also includes array like objects)

****************************************************************************************************
*let
  
  let also prevents you from redeclaring a variable but you are allowed to change the value of the variable later you just can't redeclare it


  **************************************************
  block scope 

    let creates a new scope for you called block scope

    when using 'var' inside a block statement such as if, while, for etc
      the var leaks into the surrounding scope.

    the surrounding scope does not ahve access to variables declared with let inside of a block
    (const has the same behavior)


  **************************************************
  hoisting

    let behaves differently with hoisting than var
    let hoists just like var but instead of returning undefined you recieve an error

    example : var

      function hoist() {
        return name;
        var name = 'nate'
      }

      hoist() // undefined


    example : let

      function hoist() {
        return name;
        var name = 'nate'
      }

      hoist() // ReferenceError: name is not defined

    with let when the declarations is hoisted the are inside a TDZ (temporal dead zone) where we don't have access to their values yet

  **************************************************
  the setTimeout problem (or any other asyncronous code)

    before let there was a problem with var declarations inside of a for loop

    for (var i = 0; i < 3; i++) {
      setTimeout(function() {
        console.log(i);
      },1000 )
    }

    // 3
    // 3
    // 3

    instead of loging 

    // 0
    // 1
    // 2

    this is because var is leaking into the surrounding scope, the entire for loop is placed on the stack before the event que is executed
    by that time i is 3

    the old fix was to create a new scope by wrapping the setTimeout with an immediatley invoked function and passing the i value inside the scope

    for (var i = 0; i < 3; i++) {
      (function(j) {
        setTimeout(function() {
          console.log(j);
        });
      })(i)
    }

    but now since used block scoping that is not necessary
    remember let still hoists but will cause a reference error if it has not been defined yet (instead of returning 'undefined')


****************************************************************************************************
*arrow functions

  gatchas

    arrow functions do not have the keyword 'this' or keyword 'arguments'
    in an arrow function the value of 'this' gets its original meaning from the enclosing function
    this means the value is whatever the value of 'this' would be right outside of the arrow function


  example with function()

    let greeting = {
      name : 'nate',
      greet : function() {
        setTimeout(function() {
          console.log(`Hi there ${this.name}`);
        }.bind(this), 1000);
      }
    }

    greeting.greet();  // Hi there undefined

    remember bind is used to apply whatever value you wnat for this 
      (in this case it is 'instructor' but it is better practice to use 'this' just in case the instructor variable name is changed in the future)

    if you don't use bind(), when setTimeout is finally ran it will reference the global window
    bind is used insead of call or apply because we do not want to immediatley invoke the function


    example with () =>
    
      let greeting = {
        name : 'nate',
        greet : function() {
          setTimeout( () => {
            console.log(`Hi there ${this.name}`);
          }, 1000);
        }
      }

      greeting.greet();  // Hi there undefined

      using the arrow function we get the expected result without using bind this is because
      'this' is set to the enclosing context

      remember the arrow function does not get a new keyword 'this' it just automatically referes to the nearest object that encloses it 
        (the neares 'this' that has already been defined which is probalby the global object);


    gotcha : ** arrow functions should not be used as methods in objects **

      let greeting = {
        name: 'nate',
        greet: () => {
          setTimeout( () => {
            console.log(`Hi there ${this.name}`);
          }, 1000);
        }
      }

      greeting.greet();  // Hi there undefined

      remember an arrow function does not have a 'this' keyword meaning no refference to the surrounding object, instead it refers the global object



    gotcha : arrow functions and arguments

    let talk = (word1, word2) => {
      console.log(arguments);
    }

    talk('hi', 'bye'); // this will not log the arguments as expected


****************************************************************************************************
*for of loops

  you can use a 'for..of' loop for data structures that have a primitive data type of symbol and has symbol.iterator
    (this can be checked by looking up the dunder __proto__)
    strings, arrays, maps, sets have the symbol primitive data type, objects do not

  example :

    for (let n of str) {
      console.log(n);
    }


****************************************************************************************************
*rest opperator

  collects the remaining arguments to a function and returns them to us in an array
  this is useful because the arguments keyword is no an array so in order to iterate over it you have to convert it
    the old way of doing this was

      var newArr = [].slice.call(arguments);

  example :

    function add(a, b,...c) {
      console.log(a);  // 1
      console.log(b);  // 2
      console.log(c);  // [3, 4, 5]
    }

    add(1, 2, 3, 4, 5);

  -or-

    function add(...a) {
      console.log(a);  // [1, 2, 3, 4, 5]
    }

    add(1, 2, 3, 4, 5);


  example : 
    old reduce of all args vs new reduce using the rest operator ...

    -old way-

      function add() {
        var argumentsArr = [].slice.call(arguments);
        return argumentsArr.reduce(function(s, v) {
          return s + v;
        });
      }

      console.log(add(1, 3, 5, 6, 7));


    -new way-

      function add(...a) {
        return a.reduce((s, v) => s + v);
      }

      console.log(add(1, 3, 5, 6, 7));


****************************************************************************************************
*spread operator

  also uses '...' but when they are not used as an argument to a function they are know as a spread operator

    example : 
      old (concat) vs new (spread opperator) for combineing arrays

      -old way-

        var arr1 = [1, 2, 3];
        var arr2 = [4, 5, 6];
        var arr3 = [7, 8, 9];

        combined = arr1.concat(arr2).concat(arr3);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]


      -new way-

        combined = [...arr1, ...arr2, ...arr3];
        console.log(combined);  // [1, 2, 3, 4, 5, 6, 7, 8, 9]


  you can also pass arguments to other functions that require arguments instead of an array

    example : 
      old conversion to arr vs new using spread opperator

      -old way-
        
        var arr = [1, 3, 4, 5, 6, 3];
        Math.max(arr)             // NaN

        Math.max.apply(this, arr) // 6

      -new way-

        var arr = [1, 3, 4, 5, 6, 3];
        Math.max(...arr)          // 6

  this makes it much easer to chain functions

    example :

      let add = (...arr) => arr.reduce((s, v) => v + s);
      console.log(add(1, 2, 3, 4));                             // 10


****************************************************************************************************
*objects

  ************************************************** 
  object shorthand notation

    you no longer have to repeat the key and the value if they are the same, the following code works

    let firstName = 'nate';
    let lastName = 'lipp';

    obj = {
      firstName,
      lastName,
    }

    console.log(obj.lastName); // nate
    console.log(obj.lastName); // lipp


  ************************************************** 
  object methods

    remember you do not want to use arrow functions inside of objects because arrow functions do not get assigned the keyword 'this'

      obj = {
        name: 'Nate',
        sayHi: function() {
          return 'Hi there ' + this.name;
        }
      }

      this is the correct way, but it can also be shortened

      obj = {
        name: 'Nate',
        sayHi() {
          return 'Hi there ' + this.name;
        }
      }


  ************************************************** 
  computed property names

    -old way- 

      var name = 'nate';
      var students = {};

      students[name] = 'A';

      console.log(students);  // { nate: A }


    -new way- 

      var name = 'nate';
      var students = {
        [name]: 'A',
      }

      console.log(students);  // { nate: A }


************************************************** 
*destructuring (objects and arrays)

  ************************************************** 
  destructuring objects

    example : 

      let instructor = {
        firstName: 'Elie',
        lastName: 'Shoppik'
      }

      let { firstName:first, lastName:last } = instructor;

      console.log(first); // 'Elie'
      console.log(last);  // 'Shoppik'

    notice you can also change the name (from 'firstName' to 'first' in this example)


    example : default parameters

      function createInstructor({name = { 'first': 'Matt', 'last': 'Lane'}, isHilarious = false} = {}) {
        return [name.first, name.last, isHilarious]
      }

      console.log(createInstructor()); // [ 'Matt', 'Lane', false ]

      don't forget to pass in = {} the empty object to make clear that we are destructuring an empty object


  ************************************************** 
  object Fields as Parameters

    function destructure({firstName:first, lastName:last}) {  // you can also change the names here
      return [first, last];
    }

    obj = {
      firstName: 'nate',
      lastName: 'lipp',
    }

    destructure(obj);  // ['nate', 'lipp']


  ************************************************** 
  destructuring arrays

    example :

      -old way-

        var arr = [1, 2, 3]
     
        var a = arr[0];
        var b = arr[1];
        var c = arr[2];

        a => 1
        b => 2
        c => 3

      -new way-

        var arr = [1, 2, 3]
        [a, b, c] = arr;

        a => 1
        b => 2
        c => 3


    example 2 :

      -old way-

        function returnNumbers(a, b) {
          return [a, b];
        }

        var first = returnNumbers(5, 10)[0];
        var second = returnNumbers(5, 10)[1];

        console.log(first);  // 5
        console.log(second); // 10


      -new way-

        function returnNumbers(a, b) {
          return [a, b];
        }
      
        [first, second] = returnNumbers(5, 10);

        console.log(first);  // 5
        console.log(second); // 10


  **************************************************
  swapping values

    -old way-

      function swap(a, b) {
        var temp = a;
        a = b;
        b = a;
        return [a, b]
      }


    -new way-

      function swap(a, b) {
        return [a, b] = [b, a];
      }


****************************************************************************************************
*class

  javaScript does not have build in support for classes so instead we mimick this behavior using the reserved keyword 'class'
  instead of classes javaScript uses constructor functions and attaches methods to the prototype property of the constrctor function
  the 'class' keyword creates a constant that cannot be redeclared (these do not hoist and should be defined at the top of the file)
  'new' is still used to create objects

    example : 
      'class' has a construtor function that will run automatically to instanciate any variables

      // --old way--

        function Student(firstName, lastName) {
          this.firstName = firstName;
          this.lastName = lastName;
        }

        let student1 = new Student('nate', 'lipp');


      // --new way--

        class Student {
          constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
          }
        }

        let student1 = new Student('nate', 'lipp');


  ************************************************** 
  instance methods

    in object oriented programing an instance method is a method that is available to any instance(copy) of the class
    before es2015 we placed methods onto the prototype object to prevent them from being redefined each time a copy of the class was instanciated
      the constructor function could not diferetiate between common methods and instance variables that are unique to the copy of the class
      but now since we have a constructor function we can simply place the instance methods outside the constructor function

      --old way--

        function Student(firstName, lastName) {
          this.firstName = firstName;
          this.lastName = lastName;
        }

        Student.prototype.sayHi = function() {
          return `Hi ${this.firstName} ${this.lastName}`
        }

      --new way--

        class Student {
          constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
          }
          sayHi() {
            return `Hi ${this.firstName} ${this.lastName}`
          }
        }

      the creation of the sayHi method is not being redefined each time we create an object from the Student class 
        because it is outside the constructor function


  **************************************************
  class methods (methods directly on the class)

    class methods (static methods) apply on the entire class 
    these methods are placed directly on the class
      -> Array.isArray is an example of a class method build into the Array constructor function

    example : 

      --old way--

        function Student(firstName, lastName) {
          this.firstName = firstName,
          this.lastName = lastName,
        }

        Student.prototype.sayHi = function() {               // this is not a method being applied to the entire class (class method)
          return 'Hi ' + this.firstName + this.lastName;
        }

        Student.isStudent = function(obj) {                  // this is a class method (see below)
          return obj.constructor === Student;
        }

        student1 = new Student('nate', 'lipp');
        console.log(Student.isStudent(student1));            // notice we are applying isStdudent to the Student class (this is why it is a class method)


    --new way--
    uses the static keyword

      class Student {
        constructor(firstName, lastName) {
          this.firstName = firstName; 
          this.lastName = lastName; 
        }
        static isStudent(obj) {
          return obj.constructor === Student;
        }
      }


****************************************************************************************************
*inheritance

  --old way--


    function Person(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }

    function Student() {
      Person.apply(this, arguments);
    }

    Person.prototype.sayHi = function() {
      return `Hi, ${this.firstName} ${this.lastName}`;
    }

    Student.prototype = Object.create(Person.prototype);
    Student.prototype.constructor = Student;

    Student.prototype.greetInstructor = function() {
      return `Hello Professor`;
    }

    let student1 = new Student('nate', 'lipp');
    console.log(student1.sayHi());               // Hi nate lipp
    console.log(student1.greetInstructor());     // Hello instructor
    console.log(Person.prototype);               // Person {...}
    console.log(Student.prototype);              // Studet {...}


  --new way--

    class Person {
      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }
      sayHi() {
        return `Hi, ${this.firstName} ${this.lastName}`;
      }
    }

    class Student extends Person {
      greetInstructor() {
        return `Hello Professor`;
      }
    }


    ************************************************** 
    super

      super allows you to access the arguments of the parent class

        example:

        
        class Vehicle {
          constructor (make, model, year) {
            this.make = make;
            this.model = model;
            this.year = year;
          }
          start() {
            return 'VROOM!';
          }
          toString() {
            return `The make, model, and year are ${this.make} ${this.model} ${this.year}`
          }
        }

        class Car extends Vehicle {
          constructor() {
            super(...arguments)
            this.numWheels = 4;
          }
        }

        class Motorcycle extends Vehicle {
          constructor() {
            super(...arguments)
            this.numWheels = 2;
          }
        }


****************************************************************************************************
*maps

  similar to objects except the keyword can be any datatype (not just strings)
  you can also iterate over a map using a 'forEach' method or 'for of' loop since maps have a symbol.iterator
  maps also have a size property (so you don't have to create a keys array and check the size)
  it is easier to add or remove keys from a map (especially if you are working with multiple keys at a time)
  maps also let you acess all the keys and values!
    map1.keys();
    map1.values();

    example :
      create an array from the values of a map

      Array.from(map.values());  // (Array.from is from core javascript and makes an array from an array like object)

  ************************************************** 
  weakmap

    similar to a map except all keys must be objects (not primitives)
    a weakmap has better performance that maps but they cannot be iterated over


****************************************************************************************************
*sets

  a data structure where ale values are unique
  any value can be placed in a set
  best used when you don't care about the ordering of values and you don't need to use keys

  example :
    you can pass an array to a set and it will store each value

    let set = new Set([2, 5, 7, 8, 3])

    set.add(5);         // adding multiple 5's will be ignored
    console.log(set);   // [2, 5, 7, 8, 3] 

    set.size            // 5

  ************************************************** 
  weakset

    similar to a map except all keys must be objects (not primitives)
    a weakset has better performance that maps but they cannot be iterated over


****************************************************************************************************
*promises

  a promise is a one time guarantee of some future return value
    the promise if either resolved or rejected


