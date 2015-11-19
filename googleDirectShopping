// ==UserScript==
// @name        remove google shopping tracking urls
// @description make links open destination url without redirection via google server nor without popup
// @namespace   *.google.*
// @version     1
// @grant       none
// @include     *.google.*
// @includes    *.google.*
// ==/UserScript==

//this is the ugliest script ever. feel free to clean up and create a pull request!

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

function mylog(s) {
	if(s.contains("SEARCH_TAG"))
	{
		console.log(s);	
	}	
}

function replace_url(elem, attr) {
	var elems = document.getElementsByTagName(elem);
	//console.log("elems.length " +elems.length);
	//console.log("start...");
	
	for (var i = 0; i < elems.length; i++){
				
		if (typeof elems[i][attr] === "undefined") {
			continue;
		}
		if (typeof elems[i].handled !== "undefined" && elems[i].handled == true) {
			continue;
		}
		
		
		mylog("Found " + elems[i][attr]);
		aclk = false;
		//console.log("Found " + elems[i][attr]);
		elems[i][attr] = elems[i][attr].replace('https://www.google.de/url?q=', '');
		elems[i][attr] = elems[i][attr].replace('http://www.google.de/url?q=', '');
		//mylog("Now1:  " + elems[i][attr]);
		elems[i][attr] = elems[i][attr].replace('https://www.google.de/url?q=', '');  
		elems[i][attr] = elems[i][attr].replace('http://www.google.de/url?q=', '');  
		
		elems[i][attr] = elems[i][attr].replace('https://www.google.de/url?url=', '');  
		elems[i][attr] = elems[i][attr].replace('http://www.google.de/url?url=', '');  
		//mylog("Now2:  " + elems[i][attr]);
		elems[i][attr] = elems[i][attr].replace('https://encrypted.google.com/url?q=', ''); 
		elems[i][attr] = elems[i][attr].replace('http://encrypted.google.com/url?q=', ''); 

		if(elems[i][attr].contains("www.google.de/aclk?")) {
			aclk = true;			
		}
			
		elems[i][attr] = elems[i][attr].replace('https://www.google.de/aclk?', 'WORKAROUND:');
		elems[i][attr] = elems[i][attr].replace('http://www.google.de/aclk?', 'WORKAROUND:');
		
		elems[i][attr] = elems[i][attr].replace('http://www.googleadservices.com/pagead/aclk?', 'WORKAROUND:');
		
		mylog("Now4:  " + elems[i][attr]);
	
		elems[i][attr] = elems[i][attr].replace('/url?q=http', 'http');  
		mylog("Now5:  " + elems[i][attr]);
		elems[i][attr] = elems[i][attr].replace(/sa=.*http/g, 'http');  
		mylog("Now6:  " + elems[i][attr]);
		elems[i][attr] = elems[i][attr].replace(/&sa=.*/, '');  
		mylog("Now7:  " + elems[i][attr]);
		elems[i][attr] = elems[i][attr].replace('https://www.google.de/http', 'http'); 
		elems[i][attr] = elems[i][attr].replace('http://www.google.de/http', 'http'); 
		
			
		
		mylog("Now8a:  " + elems[i][attr]);
		elems[i][attr] = decodeURIComponent (elems[i][attr]);
		mylog("Now8b:  " + elems[i][attr]);
		
			
		
		elems[i][attr] = unescape(elems[i][attr]);
		
			
		
		mylog("Now9:  " + elems[i][attr]);	
		elems[i][attr] = elems[i][attr].replace('workaround:', ''); 
		mylog("Now:  " + elems[i][attr]);	
		mylog("---------------------------");
		
		
  mylog("AAA:  " + decodeURIComponent (elems[i][attr]));
		elems[i][attr] = decodeURIComponent (elems[i][attr]);
		
		if(elems[i][attr].startsWith("https://www.google.de/http")){
			elems[i][attr] = elems[i][attr].replace('https://www.google.de/', '');
		}
		
		elems[i].handled = true;
		
		
		if(aclk) {
			//this removes the popup (which does not hold any additional information) when clicking a google shopping entry
			//removing __proto__ makes link a real a href link.
			elems[i].__proto__ = null;
		}

	}
}

function myTimer() {
	replace_url('a', 'href');
	replace_url('img', 'src');
}
	
console.log("greasemonkey remove google called");
setInterval(myTimer, 1000);
