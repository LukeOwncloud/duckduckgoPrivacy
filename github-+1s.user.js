// ==UserScript==
// @name        Github-+1s
// @namespace   github
// @description Remove noisy +1s-comments from Github issues
// @include     https://github.com/*/issues/*
// @include     http://github.com/*/issues/*
// @version     1
// @grant       none
// ==/UserScript==

//source: https://github.com/brooklynDev/github-plusone-extension/blob/master/content_script.js
//added link to gitrun.com
function buildVoteIcons() {
  var comments = [].slice.call(document.querySelectorAll('.timeline-comment-wrapper'), 0);
  var upAvatars = [];
  var downAvatars = [];
  var alreadySeenUp = [];
  var alreadySeenDown = [];

  function findUpVoter(comment) {
    findVoter('+1', comment, upAvatars, alreadySeenUp);
  }

  function findDownVoter(comment) {
    findVoter('-1', comment, downAvatars, alreadySeenDown);
  }

  function findVoter(voteText, comment, avatars, alreadySeen) {
    var regex = new RegExp('^\\' + voteText);
    var text = comment.querySelector('.comment-body').textContent.trim();
    if (text.match(regex) || comment.querySelector('img[title=":' + voteText + ':"]')) {
      var avatar = comment.querySelector('a').cloneNode(true);
      var user = avatar.href;
      if (alreadySeen.indexOf(user) < 0) {
        avatars.push(avatar);
        alreadySeen.push(user);
      }

      if (text.match(new RegExp('^\\' + voteText +'$')) || !text ) { // there wont be text if the comment is just a 👍
        comment.style.display='none';
      }
    }
  }
  
  function appendVotes(avatars, icon) {
    if (avatars.length > 0) {
      var div = document.createElement('div');
      div.className = 'flex-table gh-header-meta';
      div.innerHTML = ''+
        '<div class="flex-table-item">'+
        '  <div class="state" style="background: hsl(215, 50%, 50%)">'+
        '    <span class="octicon octicon-' + icon + '"></span>'+
             avatars.length+
        '  </div>'+
        '</div>'+
        '<div class="flex-table-item flex-table-item-primary"></div>';

      var avatarContainer = div.querySelector('.flex-table-item-primary');
      avatarContainer.style.paddingTop = 0;

      avatars.forEach(function(avatar) {
        var img = avatar.querySelector('img');
        img.className = '';
        img.style.height = '26px';
        img.style.width = '26px';
        img.style.margin = '0 2px';
        img.style.borderRadius = '3px';
        avatarContainer.appendChild(avatar);
      });

      document.querySelector('.gh-header').appendChild(div);
    }
  }
  
  function appendGitPollLink() {
    var div = document.createElement('div');
    div.className = 'flex-table gh-header-meta';
      div.innerHTML = ''+
        '<div class="flex-table-item">'+
        '<a href="http://poll.gitrun.com'+window.location.pathname+'">Show vote statistics using gitrun.com</a>'+
        '</div>'+
        '<div class="flex-table-item flex-table-item-primary"></div>';
    
    document.querySelector('.gh-header').appendChild(div);
  }

  comments.forEach(function(comment) {
    findUpVoter(comment);
    findDownVoter(comment);
  });

  appendVotes(upAvatars, 'thumbsup');
  appendVotes(downAvatars, 'thumbsdown');
  appendGitPollLink();
}

var observer = new MutationObserver(function() {
  buildVoteIcons();
});

observer.observe(document.querySelector('div.js-discussion'), {childList: true});

buildVoteIcons();
