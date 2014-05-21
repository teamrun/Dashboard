define( ( require, exports, module )->
    appView = require( './view/app-view' );

    sidebar = require './view/sidebar'

    photoTimeLine = require './view/photo-timeline'


    sidebar.init()
    photoTimeLine.init()

    # document.querySelector('#main .wrapper').innerHTML += Date.now();
)

preProcess = ( innerHTML ) ->
    return innerHTML.replace( /<div>/g, '\n' ).replace( /<br>/g, '\n' ).replace( /<\/div>/g , '' ).replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace( /\&gt;/g, '\n' );
