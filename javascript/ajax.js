****************************************************************************************************
ajax
****************************************************************************************************

*fetch requests
  polyfill
  basic fetch GET request
  fetch POST set options
  fetch error handling 
  production ready example
*Axios
*jQuery
*raw XMLHttpRequests


****************************************************************************************************
*fetch requests

  **************************************************
  polyfill

    fetch is not available for IE browsers without a pollyfill
    one option mentioned by a student, and might work is polyfill.io
    <script src="https://cdn.polyfill.io/v2/polyfill.js?features=default,fetch"></script>
    
    or

    "https://www.barrykooij.com/polyfilling-fetch-promises/"

  **************************************************
  basic fetch GET request

    example: 

      let url = "https://api.coindesk.com/v1/bpi/currentprice.json!";

      fetch(url)
        .then(function(res) {
          console.log(res);   // returns read only properties https://developer.mozilla.org/en-US/docs/Web/API/Response
          return res.json();  // returns a promise that resolves the parsed body as an object (returns the expected data but as a promise)
        })
        .then((result) => {
          console.log(result); // now the object data can be parsed
        })
        .catch((error) => {
          console.log("There was an error fetching the data :", error);
        }); 

  **************************************************  
  fetch POST set options

    example: 
      
    fetch(url, {
      method: "POST",
      body: JSON.stringify({  // this is so you don't have to manually add "" around firstName and LastName
        firstName: "Nate",
        lastName: "Lipp"
      })
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    })

  **************************************************  
  fetch error handling 

    fetch(url)
    .then(handleErrors)
    .then((data) => {
      console.log(data); 
    })
    .catch((error) => {
      console.log(error); 
    });

    function handleErrors(res) {
      if (!res.ok) throw Error("Response status :", 404);
      else res.json();
    }

  **************************************************  
  production ready example

    btn.addEventListener('click', function() {
      fetch(url)
      .then(handleErrors)
      .then(parseJSON)
      .then(updatePage) 
      .catch(printError);
    });

    function handleErrors(res) {
      if (!res.ok) throw Error(res.status);
      else return res;
    }

    function parseJSON(res) {
      return res.json().then((data) => {
        return data.results[0];
      })
    }

    function updatePage(data) {
      let pictureUrl = data.picture.medium;
      avatar.src = pictureUrl;
    }

    function printError(error) {
      let errorMessage = document.querySelector('.errorMessage'); // This should probably go at the top global scope of the file

      errorMessage.style.marginLeft = 0;         // make the error message appear on the screen by replacing margin-left: 10000px with 0;
      errorMessage.innerHTML = error;
    }


****************************************************************************************************
*fetch requests

  **************************************************
  basic fetch GET request

    example: 

      let url = "https://api.coindesk.com/v1/bpi/currentprice.json!";

      fetch(url)
        .then(function(res) {
          console.log(res);   // returns read only properties https://developer.mozilla.org/en-US/docs/Web/API/Response
          return res.json();  // returns a promise that resolves the parsed body as an object (returns the expected data but as a promise)
        })
        .then((result) => {
          console.log(result); // now the object data can be parsed
        })
        .catch((error) => {
          console.log("There was an error fetching the data :", error);
        }); 

  **************************************************  
  fetch POST set options

    example: 
      
    fetch(url, {
      method: "POST",
      body: JSON.stringify({  // this is so you don't have to manually add "" around firstName and LastName
        firstName: "Nate",
        lastName: "Lipp"
      })
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    })

  **************************************************  
  fetch error handling 

    fetch(url)
    .then(handleErrors)
    .then((data) => {
      console.log(data); 
    })
    .catch((error) => {
      console.log(error); 
    });

    function handleErrors(res) {
      if (!res.ok) throw Error("Response status :", 404);
      else res.json();
    }


****************************************************************************************************
*Axios

  Supports promises
  Automatically transforms data to JSON
  Built on top of standard XHR so there are no compatablity issues

  cdn
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

  **************************************************
  Axios get example

    axios.get(url)
      .then((res) => {
        console.log(res.data);  
      })
      .catch((error) => {
        console.log(error);  
      })


  ************************************************** 
  Axios sending params requests

    axios.get(url, {
      params: {
        id: = 1;
      }
    })
    .then(appendToPage)
    .catch(handleErrors)

    function appendToPage(res) {
    }

    function handleErrors(err) {
        if (err.response) {
          console.log("Problem With Response ", err.response.status);
        } else if (err.request) {
          console.log("Problem With Request!");
        } else {
          console.log('Error', err.message);
        }
      }




  


****************************************************************************************************
*jQuery

  cdn
    'http://code.jquery.com/'

  jQuery ajax methods
    $.ajax
    $.get
    $.post
    $.getJSON
 
  **************************************************
  $.ajax()

    $.ajax({
      method: "GET",
      url: "",
      dataType: "json"  // jquery will try to read the data type format or you can specify it here
    })
    .done(updatePage)
    .fail(printError)
        
    function updatePage(res) {
      $("#username").html(data.username);
    }

    function printError(error) {
      $("#error").html('there was an error');
    }


  **************************************************
  $.get()

    // jQuery will try to figure out the datatype on its own but you can also specify it by passing a string

    $("#getBtn").click(function(){
      $.get('https://api.github.com/users/colt')
      .done(function(data){
        console.log(data);
      })
      .fail(function(){
        console.log("ERROR!");
      })
    });

  **************************************************
  $.post()

    $("#postBtn").click(function(){
     var data = {name: "Charlie", city: "Florence"};
     $.post("www.catsarecoolandsoaredogs.com", data)
      .done(function(data){
       console.log("HI!");
     })
      .fail(function(){
       console.log("ERROR!");
     })
    });

  **************************************************
  $.getJSON()
  
    // converts the datatype to JSON

    $("#getJSONBtn").click(function(){
      $.getJSON("https://api.github.com/users/colt")
      .done(function(data){
        console.log(data);
      })
      .fail(function(){
        console.log("PROBLEM!");
      })
    });



****************************************************************************************************
*raw XMLHttpRequests

  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function() {
    if (XHR.readyState === 4) {
      if (XHR.status === 200) alert(XHR.responseText); 
      else alert('there was an error with the api request')
    }
  }

  XHR.open("GET","https://api.github.com/zen2");
  XHR.send();
