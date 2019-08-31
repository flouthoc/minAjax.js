# minAjax.js
A minimalist Javascript library for AJAX requests.

```bash
npm i minajax.js
```
```html
<script type="text/javascript" src="https://cdn.rawgit.com/flouthoc/minAjax.js/master/minify/index.min.js"></script>
```

## Syntax
```js
minAjax({
    url: "request path",
    type: "GET or POST",
    // (* Above Required *-----------------* Below Optional *)
    method: "True for async and false for non-async | Default: True",
    debugLog: "To display debug Logs | Default: False",
    data: {"Nested object which should contain requested properties in form of object properties"},
    success: "Callback function to process after response | function(data,status)",
    ready: "Stage of request | Default: 4",
    status: "Ajax condition | Default: 200",
    display: "Element ID | Default: null",
    json: "JSON format? | Default: false"
  });
```
http://flouthoc.github.io/minAjax.js/

@flouthoc (http://twitter.com/flouthoc)
