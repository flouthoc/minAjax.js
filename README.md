# minAjax.js
A minimalist Javascript library to perform AJAX POST and GET Request.



# Check Pretty Documentation
http://flouthoc.github.io/minAjax.js/

# Usage
Getting Started

```bash
npm i minajax.js
```

```html
<script type="text/javascript" src="https://cdn.rawgit.com/flouthoc/minAjax.js/master/minify/index.min.js"></script>
```


#### Regular
```js
  minAjax({
    url:"test.php",//request URL
    type:"GET",//Request type GET/POST
    //Send Data in form of GET/POST
    data:{
      name:"batman",
      profession:"detective",
      worth:"Rich",
      company:"Wayne Enterprises"
    },
    //CALLBACK FUNCTION with RESPONSE as argument
    success: function(data){
      alert(data);
    }

  });
  
````
This is example to use minAjax() , these are the frequent arguments which are usually passed for request to take place there are some optional arguments i'll explain them below.

# <strong>Compulsory Arguments</strong>

##### <b>url:</b>
```js
  url:'Path or Link to Server Side.'
```

##### <b>type:</b>
```js
  type:'GET or POST'
```

# <strong>Optional Arguments</strong>

##### <b>data:</b>
```js
  data:{
          param1:value1,
          param2:value2,
          param3:value3,
          param4:value4,
          //also send Arrays
          foo2:["bar2","bar 3","bar+4"]
          //and blah blah as many param as things support.
          }
```

##### <b>success:</b>
```js
  success: function(data){
          alert(data);
          //function to be executed on true response with response TEXT as argument.
          }
```
Execution of Callback function on valid response is totally optional , function can take <b>Response text</b> and <b>Response Status</b> as arguments to process on client side.

##### <b>method:</b>
```js
method:'True For Asyn and False for Non-Async | By default it is True'
```
By Default Method will be <b>True i.e Async calls . You Can Leave This</b>

##### <b>debugLog:</b>
```js
debugLog:'True to enable Debug Console Logs | By Default it is False'
```
By Default Method will be <b>False | You Can Leave This</b>

## Example with all arguments

```js
minAjax({
    url:"test.php",//request URL
    type:"GET",//Request type GET/POST
    //Send Data in form of GET/POST
    data:{
      name:"Superman",
      secretname:"Clark Kent",
      profession:"reporter",
      worth:"poor",
      company:"Daily Planet"
    },
    method:"true",
    debugLog:"true",
    //CALLBACK FUNCTION with RESPONSE as argument
    success: function(data){
      alert(data);
    }

  });
  
```
# Fork it , Create Pull 
@flouthoc (http://twitter.com/flouthoc)



