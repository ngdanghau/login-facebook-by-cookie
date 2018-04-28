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
		} else {
			chrome.pageAction.hide(sender.tab.id);
		}
	}
});

chrome.pageAction.onClicked.addListener(function (tab) {
	chrome.tabs.executeScript({code:"start();"});
});