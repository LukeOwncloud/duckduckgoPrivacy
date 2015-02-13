// ==UserScript==
// @name        duckduckgoPrivacy
// @namespace   duckduck
// @description Remove URL rewrite on clicking search results
// @include     https://duckduckgo.com/*
// @include     http://duckduckgo.com/*
// @version     1
// @grant       none
// ==/UserScript==

DDG.get_http_redirect=function(b){return b};