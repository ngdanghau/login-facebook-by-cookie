
var setCookie = (name, value) => 
chrome.cookies.set({
  "url":'https://www.facebook.com/', 
  "name": name, 
  "domain": '.facebook.com', 
  "path": '/', 
  "value": value, 
  "secure": true, 
  "expirationDate": (new Date().getTime()/1000) + 31536000 
});

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
	if (request.url) {
		var xhttp  = new XMLHttpRequest();
		var method = request.method ? request.method.toUpperCase() : 'GET';
		xhttp.onload = function() {
			callback(xhttp.responseText);
		};
		xhttp.onerror = function() {
			callback();
		};
		xhttp.open(method, request.url, true);
		if (method == 'POST') {
			xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		xhttp.send(request.data);
		return true;
	} else {
		var method = request.method;
		if (method == 'show') {
			chrome.pageAction.show(sender.tab.id);
		} else if(method == "run"){
			var items = request.data.includes("; ") ? request.data.split("; ") : request.data.split(";");
			for (var j = 0; j < items.length; j++) {
				var a = items[j].split("=");
				setCookie(a[0], a[1]);
			}
		} else {
			chrome.pageAction.hide(sender.tab.id);
		}
	}
});

chrome.pageAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript({code:"start();"});
});
