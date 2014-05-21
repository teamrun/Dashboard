cllUI = window.cllUI || {}




cllUI.tab = ( opt ) ->
  # navEl
  # entrySelector
  # tabContentSelector
  navEl = opt.navEl
  entrySelector = opt.entrySelector
  tabContentSelector = opt.tabContentSelector

  @navEl = navEl
  @tabContentList = $( tabContentSelector )
  @opt = opt
  navEl.delegate( entrySelector, 'click', (e) => @switchTab(e))

  initEntry = navEl.find(  "#{entrySelector}.active" )
  @tabContentList.removeClass 'active'
  if initEntry.length == 0
    navEl.find( entrySelector ).eq(0).trigger 'click'
  else
    initEntry.trigger 'click'

cllUI.tab::switchTab = (e) ->
  entry = $(e.target)
  nextTabContent = $( entry.attr('href') )
  return false if (entry.hasClass('active') && nextTabContent.hasClass 'active')

  @navEl.find( @opt.entrySelector+'.active' ).removeClass 'active'
  entry.addClass 'active'
  curIndex = 0
  nextTabUIndex = 0
  @tabContentList.each (i , el) ->
    $el = $(el)
    if $el.hasClass( 'active' )
      curIndex = i 
      $el.removeClass 'active'
    nextTabUIndex = i if $el.attr('id') == entry.attr('href')

  aniClass = ''
  if curIndex > nextTabUIndex
    # tsfStr = 'translateY(-30%)'
    aniClass = 'godown'
  else
    # tsfStr = 'translateY(30%)'
    aniClass = 'goup'

  # nextTabContent.css( {'-webkit-transform': tsfStr} )
  nextTabContent.addClass aniClass

  setTimeout ->
    nextTabContent.addClass 'active'
    # nextTabContent.css {'-webkit-transform': 'translateY(0)'}
  , 10