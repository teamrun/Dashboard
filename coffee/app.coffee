define( ( require, exports, module )->
    appView = require( './view/app-view' );
    document.body.innerHTML += Date.now();
)

preProcess = ( innerHTML ) ->
    return innerHTML.replace( /<div>/g, '\n' ).replace( /<br>/g, '\n' ).replace( /<\/div>/g , '' ).replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace( /\&gt;/g, '\n' );
