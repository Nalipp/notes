********************************************************************************
**********                   mongodb and express                      **********
********************************************************************************

*mongodb
*express
  *examples

*mongo driver
  *delete
  *update

*mongoose
  *finding documents

*pluralsight notes


********************************************************************************
*mongodb

  general differences between sql and nosql
      sql          nosql
      ------------------
      table        collection (an array like structure)
      row          document (a full jason like object)
      column       field / properties (not required among all documents)

  help or tab twice for options

  create a new project in project folder
  npm init  or  npm init -y
  npm install --save
  npm install --save mongodb

  localhost:27017/local
  localhost:27017/test
  localhost:27017/<db name>

  // Run Mongo Daemon
    mongod

  // access mongodb
    mongo
    show dbs

  // change/create db
    use <db name>

  // collections             (collection(instead of table) is like an array of elements)
    show collections  // collection will not show up if it is empty
    db.<collection name>

    db.students.insert(<JSON data>)    // create a collection and insert
    db.students.find()
    db.students.find().pretty()
    db.students.find({"name": /S/})                                 regex expression
    db.students.find({"score": {$gt: 50}})                          uses query opperator $gt => greater than
    db.students.find({"score": {$gt: 50}, "name": /Lipp$/})         use multiple queries
    db.students.find({$or: [{"name": /^Ben/}, {"name": /^Nate/}]})  or queries
    db.students.find().sort({"score": 1})                           sort
    db.students.find().sort({"score": -1})                          sort-

    db.students.find({}, {"name": 1})                               shows only name

    // update
    db.students.update({"name": "Ben Sadick"}, {$set: {"score" : 80}})
    db.students.update({_id: new ObjectId(id)}, {$set: {"status" : newStatus}})

    // push to array
    db.tasks.update({"title":"one"}, {$push: {"timeSubmission":{"timeStamp":"hi", "totalMilliseconds":5000}}})

    // delete
    db.students.remove({"name": /Lipp$/})

    // drop db
      use <db name>
      db.dropDatabase();

    // drop collection
    db.students.drop()

    // indexes are used for making faster queries, but each field must be unique
    db.users.getIndexes()
    db.users.createIndex( {"email":1}, {unique: true} )

    // set "<property value>" from 1 to -1 for Descending order

    // access the timestamp of an ObjectId
    result.ops[0]._id.getTimestamp();


  // concurrency means the database can process multiple requests at the same time
  //   the program doesn't assign the id number it is handled by the database

var personSchema = new Schema({
  name: { type: String, default: 'anonymous' },
  age: { type: Number, min: 18, index: true },
  bio: { type: String, match: /[a-zA-Z ]/ },
  date: { type: Date, default: Date.now },
});

// ********************************************************************************
// *mongo driver

     $ npm install --save mongodb;

     const {MongoClient, ObjectId} = require('mongodb');

     MongoClient.connect('mongodb://localhost:27017/cities', (err, db) => {
       if (err) return console.log(error);
       console.log(db);
     });

     // this is how you can create your own ObjectId but it is usually better to let the database do that automatically
     const obj = new ObjectId()

     // ********************************************************************************
     // *delete

     //   deleteMany (deletes all documents with the name of 'nate')
           db.deleteMany({name: 'nate'}).then((result) => {console.log(result)});
 
     //   deleteOne (deletes the first document with the name of 'nate' but does not return the deleted document)
           db.deleteMany({name: 'nate'})     

     //   findOneAndDelete (deletes the first document that meets the criteria and returns the deleted document)
           db.findOneAndDelete({name: 'nate'}).then((result) => {console.log(result)}); 

     // ********************************************************************************
     // *update
     //   https://docs.mongodb.com/v3.2/reference/method/db.collection.findOneAndUpdate/

     //   when updating a document the return value is set to the orginal document by default
     //   in order to have the actuall updated document returnd you must set returnNewDocument to true

     db.collection.findOneAndUpdate(filter, update, options)

     db.collection.findOneAndUpdate(
       <filter>,
       <update>,
       {
         upsert: <boolean>,   // if set to true and the document is not found it will create one
         returnNewDocument: <boolean>  // defaults to false
       }
     )

// ********************************************************************************
// *mongoose

   // setup

    const mongoose = require('mongoose');

    mongoose.Promise = global.Promise;  // needed in order to use promises
    mongoose.connect('mongodb://localhost:27017/collection')

    //model...

  // schema examples

    // models/message.js 

      var mongoose = require('mongoose');
      var Schema = mongoose.Schema

      var schema = new Schema({
        content: {type: String, required: true},
        user: {type: Schema.Types.ObjectId, ref: 'User'}   // references the Message model below
      })

      module.exports = mongoose.model('Message', schema);


  // validation with mongoose example
     npm install mongoose --save mongoose-unique-validator

    // models/message.js 

      var mongoose = require('mongoose');
      var Schema = mongoose.Schema;
      var uniqueValidator = require('mongoose-unique-validator');

      var schema = new Schema({
        firstName {type: String, required: true},
        lastName {type: String, required: true},
        password {type: String, required: true},
        email {type: String, required: true, unique: true},   // for unique to actually work you have to install the uniquevalidator and plugin
        message: [{type: Schema.Types.ObjectId, ref: 'Message'}]  // references the User model above
      })

      var schema = new Schema({
        firstName {type: String, required:[true, 'name is required']}, 
          // you can also pass an validation error message with required flag
          // const user = new User({name: undefined});
          // the message 'name is required' can be accessed with user.validateSync().errors.name.message
          //  -or-
          // const = validationResult = user.validateSync()
          // vadationResult.errors.name.message

      schema.plugin(uniqueValidator);

      module.exports = mongoose.model('User', schema);


  //   *finding documents
         find({_id: id}).then...      // returns an array if there is no document returns an empty array
         findOne({_id: id}).then...   // returns an object or null 
         findById(id).then...         // only requires the string id (best option but requires you to query by id)

  //   *remove documents
         remove({_id: id}).then...             // removes all documents that meet the criteria
         findOneAndRemove({_id: id}).then...   // removes the first instance of a matching document, 
                                               //   same as findByIdAndRemove but you can use other queries besides id 
         findByIdAndRemove(id).then...         // allows you to query by id with only the string of the id
                                               //   returns the document that was removed


// ********************************************************************************
// *pluralsight notes

  // inserting documents
    db.users.save({_id: 1}, name: 'nate')  // could be a problem if more then one user is trying to updated the same doc at the same time
    db.users.update({_id: 1}, {$set: {name: 'nate'}})          // update is better because it won't write over the other users update
    db.users.update({_id: 1}, {$inc: {points: 1}})             // increment might be a more realistic example 
    db.users.update({_id: 1}, {$unset: {points: ''}})          // removes a field -> the '' have no impact other than holding place 
    db.users.update({_id: 1}, {$rename: {'points': 'point'}})  // rename example
    db.users.update({_id: 1}, {$push: {name: 'nate'}})         // pushes to an existing array, if no array converts the field type to array 
                                                               // this will not convert to an array if there is an existing string
    db.users.update({_id: 1}, {$addToSet: {name: 'nate'}})     // same as push but only pushes the value if that value dosen't already exist 
    db.users.update({_id: 1}, {$pull: {name: 'nate'}})         // removes all instances of a value in an array 
    db.users.update({_id: 1}, {$pop: {name: 1}})               // removes last element in an aray
    db.users.update({_id: 1}, {$pop: {name: -1}})              // removes first element in an aray
    db.users.update({}, {$push: {name: 'nate'}})               // updates only first element by default 
    db.users.update({}, {$push: {name: 'nate',}}, {multi:true})// updates all documents in the collection
    db.users.update({name:'bill'}, {$push: {name: 'nate',}}, {multi:true}) // updates all documents if the name contains a value of 'bill'

  // retrieving documents
    db.users.find({_id: 1}, {name:'nate'});                    // only returns the name field for id 1
    db.users.find({points: {$gt : 5});                         // returns documents with points greater than 5
    db.users.find({points: {$lt : 5});                         // returns documents with points less than 5
    db.users.find({points: {$lte : 5});                        // returns documents with points less than  or equal to 5
    db.users.find({points: {$lt : 5, $gte : 2});               // (range) returns documents with less than 5 and greater than or equal to 2
    db.users.find({points: {$not:, {name : 'nate'}}});         // (negative) returns documents not with name 'nate'
    db.users.find({points: {$in:, [1, 3]}});                   // returns documents with point value of 1 or 3
    db.users.find({points: {$nin:, [1, 3]}});                  // returns documents with point value not 1 or 3
    db.users.find({points: {$all:, [1, 3]}});                  // returns documents with point value must have 1 and 3

    // retriving documents in a subdocument
    db.courses.find({instructors.name: 'nate'})
    db.courses.find({'instructors.name': {$exists: true}})     // returns all subdocuments where the instructor name has been defined
    db.courses.find({level: 'admin'}, {name: 1, color: 1})     // returns name and color fields of documents where level is 'admin' 
    db.courses.find({level: 'admin'}, {name: 0, color: 0})     // returns evertything except name and color fields
    db.courses.find({level: 'admin'}, {_id: 0})                // id is always returned unless specifically excluded
    db.courses.find({level: 'admin'}, {$sort: {name:1}})       // returns a sorted list of admins by name
    db.courses.find({level: 'admin'}, {$sort: {name:-1}})      // returns a sorted list of admins by name desending
    db.courses.find({level: 'admin'}, {$sort: {name:-1, color:1}}) // sort by multiple fields
    db.courses.find({instructors.name: 'nate'}).limit(3)       // retirns first 3
    db.courses.find({instructors.name: 'nate'}).skip(2).limit(3)// page through documents on the server side is better than client side
    db.courses.findOne({instructors.name: 'nate'})             // returns only one


