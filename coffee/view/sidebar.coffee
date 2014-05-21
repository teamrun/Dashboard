define( (require, exports, module) ->

  _id =
    foo: 'bar'
    navList: 'nav-list'
    navItem: 'nav-list li>a'

  _class =
    foo: 'bar'
    navActive: 'active'
    wrapper: 'wrapper'
    wrapperActive: 'active'

  navList = undefined


  _event = 
    bind: ->
      # navList.delegate( 'a','click',_event.switchTab )

      uiTab = new cllUI.tab { navEl: navList
      entrySelector: 'li>a'
      tabContentSelector: '.wrapper'
      }

  init = ->
    navList = $('#'+_id.navList);


    _event.bind()


  return init: init
)



