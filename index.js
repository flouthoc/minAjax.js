/*
  |-- minAjax.js - A minimalist Javascript library for AJAX requests. --|
  |-- Author: flouthoc (gunnerar7@gmail.com)(http://github.com/flouthoc) --|
  |-- Contributers: argunner, KingChung, mc-zone, fgrehm, ForgivenNin --|
  |-- MIT License --|
  |-- https://github.com/flouthoc/minAjax.js --|
*/

function initXMLhttp() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // Major Browsers
        xmlhttp = new XMLHttpRequest();
    } else {
        // Internet Explorer
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function minAjax(config) {

    if (!config.url) {
        if (config.debugLog == true)
            console.log("No Url!");
        return;
    }

    if (!config.type) {
        if (config.debugLog == true){
            console.log("No Default type (GET/POST) given!");
        return;
        }
    }

    if (!config.method) {
        config.method = true;
    }

    if (!config.debugLog) {
        config.debugLog = false;
    }

    if (!config.ready) {
        config.ready = 4;
    }

    if (!config.status) {
        config.status = 200;
    }
  
    if (!config.display) {
        config.display = null; 
    }
  
    if (!config.json) {
      config.json = false; 
    }

    var xmlhttp = initXMLhttp();

    xmlhttp.onreadystatechange = function() {

        if (xmlhttp.readyState == config.ready && xmlhttp.status == config.status) {
            if (config.success) {
                config.success(xmlhttp.responseText, xmlhttp.readyState);
            }
            if (config.debugLog == true){
                console.log("Successful Response");
                console.log("Response Data:" + xmlhttp.responseText);
            }
        } else {
            if (config.debugLog == true)
                console.log("FailureResponse --> State:" + xmlhttp.readyState + "Status:" + xmlhttp.status);
            if(config.errorCallback){
                console.log("Calling Error Callback");
                config.errorCallback();
            }
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
    }else if(typeof sendData === 'object' && !(sendData instanceof String || (FormData && sendData instanceof FormData))){
        for (var k in sendData) {
            var datum = sendData[k];
            if(Object.prototype.toString.call(datum) == "[object Array]"){
                for(var i = 0, j = datum.length; i < j; i++) {
                        sendString.push(encodeURIComponent(k) + "[]=" + encodeURIComponent(datum[i]));
                }
            }else{
                sendString.push(encodeURIComponent(k) + "=" + encodeURIComponent(datum));
            }
        }
    }

    sendString = sendString.join('&');

    if (config.type == "GET") {
        xmlhttp.open("GET", config.url + "?" + sendString, config.method);
        xmlhttp.send();

        if (config.debugLog == true){
            console.log("GET fired at:" + config.url + "?" + sendString);
        }
    }

    if (config.type == "POST") {
        xmlhttp.open("POST", config.url, config.method);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(sendString);

        if (config.debugLog == true){
            console.log("POST fired at:" + config.url + " || Data:" + sendString);
        }
    }
  
  if (config.json === false) {
    document.getElementById(config.display).innerText = xmlhttp.responseText;
    document.getElementsByClassName(config.display).innerText = xmlhttp.responseText;
  } else {
    const j = JSON.parse(xmlhttp.responseText);
    document.getElementById(config.display).innerText = j;
    document.getElementsByClassName(config.display).innerText = j;
  }
}
