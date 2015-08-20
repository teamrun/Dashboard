/**
 * term.js - an xterm emulator
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 * https://github.com/chjj/term.js
 */

function term(options) {
  return new term.Terminal(options);
}

term.middleware = function(options) {
  var url = require('url');

  options = options || {};
  options.path = options.path || '/term.js';

  return function* (next) {
    if (url.parse(this.url).pathname !== options.path) {
      yield next;
      return;
    }

    if (+new Date(this.get('if-modified-since')) === term.last) {
      this.status = 304;
      return;
    }

    this.status = 200;
    this.set({
      'Content-Type': 'application/javascript; charset=utf-8',
      'Content-Length': Buffer.byteLength(term.script),
      'Last-Modified': term.last
    });

    this.body = term.script;
    return;
  };
};

term.path = __dirname + '/../src/term.js';

term.__defineGetter__('script', function() {
  if (term._script) return term._script;
  term.last = +new Date;
  return term._script = require('fs').readFileSync(term.path, 'utf8');
});

term.__defineGetter__('Terminal', function() {
  if (term._Terminal) return term._Terminal;
  return term._Terminal = require('../src/term');
});

/**
 * Expose
 */

module.exports = term;
