(function() {
  var preProcess;

  define(function(require, exports, module) {
    var appView, photoTimeLine, sidebar;
    appView = require('./view/app-view');
    sidebar = require('./view/sidebar');
    photoTimeLine = require('./view/photo-timeline');
    sidebar.init();
    return photoTimeLine.init();
  });

  preProcess = function(innerHTML) {
    return innerHTML.replace(/<div>/g, '\n').replace(/<br>/g, '\n').replace(/<\/div>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/\&gt;/g, '\n');
  };

}).call(this);
