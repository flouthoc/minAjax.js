/*|--minAjax.js--|
  |--(A Minimalistic Pure JavaScript Header for Ajax POST/GET Request )--|
  |--Author : argunner (gunnerar7@gmail.com)(http://github.com/argunner)--|
  |--Contributers : Add Your Name Below--|
  */

// all possible variants
var XMLHTTPtypes = [
    function() { return new XMLHttpRequest(); },
    function() { return new ActiveXObject("Msxml3.XMLHTTP"); },
    function() { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); },
    function() { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); },
    function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
    function() { return new ActiveXObject("Microsoft.XMLHTTP"); }
];

// return the appropriate object
function XMLhttp() {
    if(this instanceof XMLhttp) {
        XMLHTTPtypes.forEach(function(t) {
            try { xmlhttp = t(); } 
            catch(e) {}
        });
        return xmlhttp;
    } else {
        return new XMLhttp();
    }
}

var req = {
    get: function get(obj, data) {
        obj.open("GET", this.url + "?" + data, this.async);
        obj.send();
    },
    post: function post(obj, data) {
        obj.open("POST", this.url, this.async);
        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        obj.send(data);
    },
    head: function head(obj, data) {
        obj.open("HEAD", this.url + "?" + data, this.async);
        obj.send();
    },
    // append more http request methods at will and include them in the condition below (102)!
    log: function log(obj, data) {
        console.log(this.type.toUpperCase() + " fired at: " + this.url + " || Data:" + data);
    }
}

function minAjax(config) {

    /*Config Structure
            url:"reqesting URL"
            type:"GET or POST"
            method: "(OPTIONAL) True for async and False for Non-async | By default its Async"
            debugLog: "(OPTIONAL)To display Debug Logs | By default it is false"
            data: "(OPTIONAL) another Nested Object which should contains reqested Properties in form of Object Properties"
            success: "(OPTIONAL) Callback function to process after response | function(data,status)"
    */

    if(config.url === "") {
        if (config.debugLog === true) { console.log("No Url!"); }
        return;
    }
    if(config.type === "") {
        if (config.debugLog === true) { console.log("No request type given"); }
        return;
    }

    if(config.method === true) {
        config.method = true;
    } else if ( config.method === undefined ) {
        // nothing is given - defaulting to true
        config.method = true;
        // everything else should be treated as false
    } else {
        config.method = false;
    }

    config.debugLog === true ? true : false;

    var xmlhttp = XMLhttp();

    xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            if (config.success) {
                config.success(xmlhttp.responseText, xmlhttp.readyState);
            }

            if (config.debugLog == true)
                console.log("SuccessResponse");
            if (config.debugLog == true)
                console.log("Response Data:" + xmlhttp.responseText);

        } else {

            if (config.debugLog == true)
                console.log("FailureResponse --> State:" + xmlhttp.readyState + "Status:" + xmlhttp.status);
        }
    }

    var sendString = [],
        sendData = config.data;
    if( typeof sendData === "string" ){
        var tmpArr = String.prototype.split.call(sendData,'&');
        for(var i = 0, j = tmpArr.length; i < j; i++){
            var datum = tmpArr[i].split('=');
            sendString.push(encodeURIComponent(datum[0]) + "=" + encodeURIComponent(datum[1]));
        }
    }else if( typeof sendData === 'object' && !( sendData instanceof String || (FormData && sendData instanceof FormData) ) ){
        for (var k in sendData) {
            var datum = sendData[k];
            if( Object.prototype.toString.call(datum) == "[object Array]" ){
                for(var i = 0, j = datum.length; i < j; i++) {
                        sendString.push(encodeURIComponent(k) + "[]=" + encodeURIComponent(datum[i]));
                }
            }else{
                sendString.push(encodeURIComponent(k) + "=" + encodeURIComponent(datum));
            }
        }
    }
    sendString = sendString.join('&');

    if((config.type === "GET") || (config.type === "POST") || (config.type === "HEAD")) {
        req[config.type.toLowerCase()].call(config, xmlhttp, sendString);
        if(config.debugLog) { req.log.call(config, xmlhttp, sendString); }
    } else {
        console.log('Request type not supported');
    }
}