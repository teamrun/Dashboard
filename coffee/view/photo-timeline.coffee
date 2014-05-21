# 如何在模块加载系统中使用node模块~?  require被覆盖了``
# 使用全局的window.require?

define( (require, exports, module) ->
  fs = window.require 'fs'
  path = window.require 'path'
    # console.log fs

  _id = 
    'addPhoto': 'add-photo'


  _class = 
    'photoItem': 'photo-item'
    'previewImg': 'preview'

  addPhoto=undefined
  previewImg=undefined

  _event = 
    bind: ->
      cllUI.dropable( addPhoto )
      addPhoto.bind 'drop', _event.dropHandler

    dropHandler: (e) ->
      dataTransfer = e.originalEvent.dataTransfer
      console.log dataTransfer.files
      console.log dataTransfer.types

      file = dataTransfer.files[0]

      reader = new FileReader()

      reader.onloadend = ->
        previewImg.attr('src', reader.result)
        # fs.writeFile '/Users/chenllos/Documents/dev/photo.jpg', reader.result, (err) ->
        writePath = path.join __dirname, './photo.jpg'
        console.log writePath
        fs.writeFile writePath, reader.result, (err) ->
          console.log err

      # 有 异步读取
      if file
        reader.readAsDataURL(file);
      # 如果没有file 清空
      else
        previewImg.attr('src', '')

  init = ->
    addPhoto = $('#'+_id.addPhoto)
    previewImg = $('.'+_class.previewImg)






    _event.bind()

  # return object
  return init: init
)