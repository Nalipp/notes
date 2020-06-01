
// function House(bedrooms, bathrooms, squareFeet) {
//   this.bedrooms = bedrooms;
//   this.bathrooms = bathrooms;
//   this.squareFeet = squareFeet;
// }

// let house1 = new House(2, 2, 1100);
// this.bedrooms = 4;

// console.log(house1);

// let House = (bedrooms, bathrooms, squareFeet) => {
//   this.bedrooms = bedrooms;
//   this.bathrooms = bathrooms;
//   this.squareFeet = squareFeet;
//   return this;
// }

// let house1 = House(2, 2, 1100);
// this.bedrooms = 4;

// console.log(house1);

// function Dog(name, age) {
//   this.name = name;
//   this.age = age;
//   this.bark = function bark() {
//     console.log(this.name + ' just barked!');
//   }
// }

// var rusty = new Dog('Rusty', 3);
// var fido = new Dog('Fido', 1);

// rusty.bark() // Rusty just barked!
// fido.bark() // Fido just barked!

// function Car(make, model, year) {
//   this.make = make;
//   this.model = model;
//   this.year = year;
//   this.numWheels = 4;
// }

// function Motorcycle(make, model, year) {
//   // this.make = make;
//   // this.model = model;
//   // this.year = year;
//   Car.call(this, make, model, year);
//   this.numWheels = 2;
// }

// let car1 = new Car('chevy', 'malibu', 2012);
// let motorcycle1 = new Motorcycle('harley', 'cruiser', 1980);

// console.log(car1);
// console.log(motorcycle1);

// function Vehicle(make, model, year) {
//   this.make = make;
//   this.model = model;
//   this.year = year;
// }

// function Car(make, model, year) {
//   Vehicle.apply(this, arguments);
//   this.numWheels = 4;
// }

// function Motorcycle(make, model, year) {
//   Vehicle.apply(this, arguments);
//   this.numWheels = 2;
// }

// function semiTruck(make, model, year) {
//   Vehicle.apply(this, arguments);
//   this.numWheels = 18;
// }

// let car1 = new Car('chevy', 'malibu', 2012);
// let motorcycle1 = new Motorcycle('harley', 'cruiser', 1980);
// let semiTruck1 = new semiTruck('Great Dane', 'super glider', 2016);

// console.log(car1);
// console.log(motorcycle1);
// console.log(semiTruck1);

function Person(name) {
  this.name = name;
  // this.sayHi = function() {
  //   return 'Hi ' + this.name + '!';
  // }
}

Person.prototype.sayHi = function() {
  return 'Hi ' + this.name + '!';
}

person1 = new Person('nate');

console.log(person1.sayHi());
