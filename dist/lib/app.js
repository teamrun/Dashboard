var preProcess;

define(function(require, exports, module) {
  var appView;
  appView = require('./view/app-view');
  return document.querySelector('#main').innerHTML += Date.now();
});

preProcess = function(innerHTML) {
  return innerHTML.replace(/<div>/g, '\n').replace(/<br>/g, '\n').replace(/<\/div>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/\&gt;/g, '\n');
};
