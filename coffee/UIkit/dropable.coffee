cllUI = window.cllUI || {}


cllUI.dropable = ( $el ) -> 
  $el.bind( 'dragenter',(e) ->
    $el.addClass('dragenter')
    e.preventDefault()
  )

  $el.bind( 'dragleave', (e) -> 
    $el.removeClass( 'dragenter' )
  )

  $el.bind( 'dragover', (e) ->
    e.preventDefault()
  )

  $el.removeClass( 'dragend',(e) ->
    $el.removeClass( 'dragenter' )
    e.preventDefault()
  )

  $el.bind( 'drop', (e) -> 
    $el.removeClass( 'dragenter' )
    e.preventDefault()
  )
  