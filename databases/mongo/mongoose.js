*******************************************************************************************
*****     Mongoose     ******************************************************************** 
*******************************************************************************************

*setup
*rest examples
*associations
*udemy mongo mongoose course


*******************************************************************************************
*setup
*******************************************************************************************
// mongoose.Promise = global.Promise

// npm remove mongoose
// npm install mongoose@4.10.8 --save


// config/dbConfig.js
const mongoose = require('mongoose');
let url;

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'dev') {
  url = 'mongodb://localhost:27017/tstoryDev';
} else if (process.env.NODE_ENV === 'test' ) {
  url = 'mongodb://localhost/tstoryTest'
} else {
  url = 'mongodb://heroku_dq13zd86:q5eilfck8e418hr07rtk8v2tqj@ds151433.mlab.com:51433/heroku_dq13zd86';
}

mongoose.connect(url, err => {
  if (err) {
    console.log("# Failed to connect to MongoDB ");
  } else {
    console.log('# Connected to MongoDB', url)
  }
}) 

// package.json
"scripts": {
  "start": "node ./bin/www",
  "dev": "export NODE_ENV=dev || SET \"NODE_ENV=dev\" && nodemon start",
  "test": "export NODE_ENV=test || SET \"NODE_ENV=test\" && mocha --recursive"
}

// app.js
require('./config/dbConfig');

// models/user.js
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);


*******************************************************************************************
*rest examples
*******************************************************************************************

router.get('/', (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) res.redirect('/');
    else res.send(users);
  });
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) res.redirect('/');
    else res.send(user);
  });
});

router.post('/', (req, res, next) => {
  User.create(req.body, (err, newUser) => {
    if (err) res.redirect('/users/new');
    else res.send(newUser);
  });
});

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, (err, result) => {
    if (err) res.redirect('/users/' + id)
    else res.redirect('/users/' + id);
  });
});

router.post('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  User.findByIdAndRemove(id, (err, result) => {
    if (err) res.redirect('/users' + id);
    else res.redirect('/users');
  });
});



****************************************************************************************************
*associations
****************************************************************************************************

  *object reference example
  *embeded reference example
  *builiding a model from a schema

****************************************************************************************************
*object reference example

  const postSchema = new mongoose.Schema({
    title: String,
    content: String
  });

  const Post = mongoose.model("Post", postSchema);

  const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  });

  const User = mongoose.model("User", userSchema);

  User.findOne({email: 'bob@gmail.com'})
    .populate('posts')
      .exec( (err, user) => { 
        if (err) return console.log(err);
        console.log(user);
      });

  Post.create({
    title: 'going camping!',
    content: 'This year I want to go camping in oregon!'
  }, function(err, post) {
    User.findOne({email: 'bob@gmail.com'}, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        foundUser.posts.push(post);
        foundUser.save( (err, user) => {
          if (err) return console.log(err);
          console.log(user); 
        });
      }
    })
  })

  User.findOne({email: 'bob@gmail.com'}, (err, user) => {
    if (err) return console.log(err);
    console.log(user); 
    Post.find({_id: user.posts}, (err, post) => {
      if (err) return console.log(err);
      console.log(post); 
    });
  });


  User.create({
    email: 'bob@gmail.com',
    name: 'bob belcher'
  });
    

****************************************************************************************************
*embeded reference example

  const postSchema = new mongoose.Schema({
    title: String,
    content: String
  });

  const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
  });

  const User = mongoose.model("User", userSchema);
  const Post = mongoose.model("Post", postSchema);

  const newUser = new User({
    email: 'charlie@brown.com',
    name: 'charlie'
  });

  newUser.posts.push({title: 'title1', content: 'this is the first post'});
  newUser.posts.push({title: 'title2', content: 'this is the second post'});
  newUser.posts.push({title: 'title3', content: 'this is the third post'});

  newUser.save( (err, user) => {
    if (err) return console.log(err);
    console.log(user); 
  });

  newPost = new Post({
    title: 'Post title',
    content: 'This is a post'
  });

  newPost.save( (err, post) => {
    if (err) return console.log(err);
    console.log(post); 
  });


// ****************************************************************************************************
// *builiding a model from a schema


  // Start with the schema
    const newCustomer = new Schema({
      name: String,
      email: String
    });

  // Build a model from the customer schema
    const Person = new Schema({'Person', newCustomer});

  // Create a document from the model
    const bob = new Person({
      name: 'bob',
      email: 'bob@mail.com'
    });


*******************************************************************************************
*udemy mongo mongoose course
*******************************************************************************************

*examples
*mongoose
*mocha testing
*nesting resources
*object reference association 


*******************************************************************************************
*examples

  xit('...      // skips this test
  it.only('...  // skips all other tests 

  Promise.all([joe.save(), blogPost.save(), comment.save()])  // saves asyncronously
    .then(() => done());

// example schema
  const mongoose = require('mongoose');
  const PostSchema = require('./post');
  const Schema = mongoose.Schema;
  const uniqueValidator = require('mongoose-unique-validator');

  const UserSchema = new Schema({ 
    name: {
      type: String, 
      required: [true, 'Name is required.'],
      validate: {
        validator: (name) => name.length > 2,
        message: 'Name must be longer than two characters'
      }
    },
    email: {type: String, required: true, unique: true},   // don't forget to install the uniquevalidator and plugin
    age: { type: Number, min: 18, index: true },
    bio: { type: String, match: /[a-zA-Z ]/ },
    date: { type: Date, default: Date.now },
    posts: [PostSchema],          
    blogPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
      }
    ]

  });

// example middleware

  UserSchema.virtual('postCount').get(function() {
    return this.posts.length
  });

  UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({_id: { $in: this.blogPosts}}) 
      .then(() => next());
  });

  User.findOne({name: 'joe'})
        .populate('blogPosts')    // fetches the entire nested element instead of just the id number
        .then((user) => {

  const User = mongoose.model('user', UserSchema); 
  module.exports = User;

*******************************************************************************************
*mongoose


  mongoose is an ODM object database mapper (object data mapping)

  example setup
  
    // server

      const mongoose = require('mongoose');

      mongoose.connect('mongodb://localhost/users_test');
      mongoose.connection
        .once('open', () => console.log('Mongo good to go'))       // .once listens for ('open' to be emited from the mongoose connection')
        .on('error', (error) => {                                  // .on listens constantly (for an error)
          console.warn('Warning', error);
        });


    // model

      const mongoose = require('mongoose');
      const Schema = mongoose.Schema;

      const UserSchema = new Schema({                   // the schema specifies the data pattern to be followed
        name: String;
      });

      const User = mongoose.model('user', UserSchema);  // the model and where the collection is defined and created
                                                        // const User represents the entire collection of data
      module.exports = User;
          


*******************************************************************************************
*mocha testing

  isNew -> allows you to ask if an instance of a Model has been saved
  
    describe('Creating records', () => {
      it('Saves a user', (done) => {
        const joe = new User({name: 'joe'});
          console.log(joe.isNew);              // true
        joe.save()
          .then(() => {
            console.log('joe.isNew');          // false
            assert(!joe.isNew);
            done();
          })
      });
    });


  asserting _id gotcha -> you must call toString() to access the actual string value of an id

    assert(joe._id.toString() === users[0]._id.toString());


  ****************************************************************
  4 ways of removing a file from a collection

    instance remove       joe.remove()
                            .then...
                       -> when you already have the record that you want to remove
                            you an remove a user without using the class instance (User)

    method remove         User.remove({name: joe}); 
                       -> when you have multiple items you want to search and remove by criteria

    findOneAndRemove   -> finds by a criteria and the first record that matches that criteria is removed
    findByIdAndRemove  -> find and removes by id


  ****************************************************************
  5 ways of updating a file in a collection

    instance set and save     joe.set('name', 'toe');
                              joe.save()
                                .then...

    instance update           joe.update({name: 'toe')
                                .then...
                           -> updates and saves the selected instance

    method update             User.update({name: 'joe'}, {name: 'toe'});
                           -> finds all file that match criteria and updates with set value

    findOneAndUpdate       -> finds by a criteria and the first match is updated
    findByIdAndUpdate      -> finds and updates by id

  ****************************************************************
  update opparators 
    
    $inc   -> increments a number by the specified amount
    $set   -> sets the value to a the specified new value
    $unset -> deletes the value


*******************************************************************************************
*nesting resources
 sub documents

  unlike sql no-sql databases don't always use join tables???
  it is possible to nest resources in an array

    example:
      A User has many posts, and a post only has one user (one to many association)
      User holds an array of posts, where a defined post model is not always necessary
        instead of a seperate model only a post schema (sub document) may be necessary

      a subdocument may not always be the best choice especailly if you are trying to 
        list subdocuments of multiple users together on the same query
        example may be if you want to list blog posts by multiple users on a page feed

      a subdocument may be a good solution if you only need to fetch the users array of sub documents
        example may be an array of timestamps for when a user logs in and the total count only need to be displayed for that user
          however if you wanted to get the total data count of timestamps for multiple users this may become a problem 
          because you would have to make a query for each user 

  ****************************************************************
  virtual property / field
    when we have a property on our model that isn't actually saved to the mongo database

    example : if we want to count the length of posts on the fly but don't need to store that to mongo
              postCount is a derivitive of post / a virtual property
              virtual properties are not placed inside the user schema but added as seperate declarations

          UserSchema.virtual('postCount')

              virtual tells mongo that we wan to define a virtual field
              .get() allows you to chain on an additional function() (the full 'function()' keyword must be used
                you can't user () => becuase you are goin to need access to 'this '

          UserSchema.virtual('postCount').get(function() {
            return this;                    // 'this' allows access to the model values accociated with the loaded user
          });

          UserSchema.virtual('postCount').get(function() {
            return this.posts.length;
          });


          you can play around with this using node shell
          $ node
          User = require('./src/user');     
          joe = new User();
          joe.postCount                     // references whatever was returned from the virtual('postCount')



*******************************************************************************************
*object reference association 

  example :

    const userSchema = new Schema({
      name: String,
      blogPosts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'blogPost'
        }
      ]
    });

    this allows you to store an array of blog posts by their id in order to access the actual posts you can use populate

      User.findOne({name: 'joe'})
        .populate('blogPosts')
        .then((user) => {
          console.log(blogPosts);
      })

    sometimes there may be more than one nested resource which can be accessed by specifiying the path and an additional populate
    example: blogPosts that have coments nested in them

      User.findOne({name: 'joe'})
        .populate({
          path: 'blogPosts',
          populate: {
            path: 'comments',
            model: 'comment',
            populate: {
              path: 'user',
              model: 'user'
            }
          }
        })
      })

      this goes gives access to blogPosts, comments belonging to blogPosts, and users belogning to comments this could go on...


    ****************************************************************
    getting rid of danglers

    // in order to delete out all blogPosts when the parent user is deleted you need to set up middleware
    // example:

      // middleware added to User model (UserSchema.pre is middleware just like UserSchema.virtual above)
      // mongose.model('') allows access to the model ignoring dependent references that may exist in other models

      UserSchema.pre('remove', function(next) {
        const BlogPost = mongoose.model('blogPost');
        BlogPost.remove({_id, { $in: this.blogPosts}})
          .then(() => next());
      });


