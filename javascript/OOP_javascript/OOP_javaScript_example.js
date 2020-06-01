// **************************************************
// two steps for prototypical inheritance

// 1. set the functions prototype object to the function that it is inheriting from with 
//      <childFunction>.prototype = Object.create(<ParentFunction>.prototype)
// 2. reset the prototype constructor property 
//      <childFunction>.prototype.constructor = <childFunction>

//**************************************************

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.sayHi = function() {
  return 'Hi ' + this.firstName + ' ' + this.lastName + '!';
}

function Student() {
  Person.apply(this, arguments);
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student

Student.prototype.status = function() {
  return this.firstName + " is currently a student";
}

Person.prototype.walk = function() {
  return this.firstName + ' is now walking';
}

let person1 = new Person('nate', 'lipp');
console.log(person1.walk());
let student1 = new Student('Julia', 'Lipp'); 
console.log(student1.status());

// console.log('Person.prototype.__proto__', Person.prototype.__proto__);    // {}
// console.log('Student.prototype.__proto__', Student.prototype.__proto__);  // Person { sayHi: [Function] }

