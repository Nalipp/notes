// ********************************************************************************
// express
//
// *getting started
// *middleware
//
//
// ********************************************************************************
// *getting started

    npm init
    npm init -y

    npm install --save express
    npm install --save ejs
    npm install --save body-parser

    const express = require('express')
    const app = express() // http.createServer()
    const bodyParser = require('body-parser');

    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + "/public"));
        // body-parser allows you to access req.body
        // connect public files (css and javascript) 
        // you still need to link to them above the body

  // ********************************************************************************
  // middleware
    app.use((req, res, next) => {  // use is the midleware not the router
      console.log('Date ' + Date())
      next()  // end middlware with next(), otherwise the flow will stop here and hang
    })

    app.get('/hello', (req, res, next) => {  // next controls the flow by allowing you to jump to the next middleware
      res.send('hello')  // send does parse and stringify automatically
    }

    // examples

      app.use((req, res, next) => {  // use is the midleware not the router
        console.log('Date ' + Date())
        next()  // end middlware with next(), otherwise the flow will stop here and hang
      })

      app.use((req, res, next) => {  // use is the midleware not the router
        console.log('request method : ' + req.method + ' url : ' + req.url)
        next()  // end middlware with next(), otherwise the flow will stop here and hang
      })

      app.get('/hello', (req, res) => {
        res.send('hello')  // send does parse and strinify automatically
      })

      app.get('/world', (req, res) => {
        res.send('world')  // send does parse and strinify automatically
      })

      app.listen(5000, () => {
        console.log('Express listening on port 5000')
      })


      // allows you to specify where the flies to be served to the page
      // you can access the files directly through the url
      app.use(express.static(path.join(__dirname, 'public')))   
