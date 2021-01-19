challenge.controller('ChannelsCtrl', function($scope, HttpFctr){

  $scope.__init__ = function(){
    $scope.channels = []
    $scope.data = []
    $scope.inChilds = false
    $scope.channelSelected = {}
    $scope.lastChannelId = 0
    $scope.openCreateModal = false
    $scope.openEditModal = false
    $scope.createChannel = {
      'name': '',
      'urls': '',
      'categories': '',
      'status': '',
    }
    $scope.editChannel = {
      'id': '',
      'name': '',
      'urls': '',
      'categories': '',
      'status': '',
    }
    $scope.getChannels()
  }

  $scope.getChannels = function() {
    HttpFctr('channels', 'GET').then(function(response){
      $scope.data = response
      $scope.createDependencies()
    })
  }

  $scope.createNewChannel = function() {
    var data = JSON.stringify($scope.createChannel)
    HttpFctr('channels', 'POST', {data}).then(function(){
      $scope.getChannels()
      $scope.openCreateModal = false
      $scope.createChannel = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(error.statusText + ' Entrada duplicada')
    })
  }

  $scope.editModal = function(Channel) {
    $scope.openEditModal = true
    $scope.editChannel.id = Channel.id
    $scope.editChannel.name = Channel.name
    $scope.editChannel.urls = Channel.urls
    $scope.editChannel.categories = Channel.categories
    $scope.editChannel.status = Channel.status
  }

  $scope.updateChannel = function() {
    var data = JSON.stringify($scope.editChannel)
    HttpFctr(`channels/${$scope.editChannel.id}`, 'PUT', {data}).then(function(){
      $scope.getChannels()
      $scope.openEditModal = false
      $scope.editChannel = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(error.statusText + ' Entrada duplicada')
    })
  }

  $scope.deleteChannel = function(channel_id) {
    HttpFctr(`channels/${channel_id}`, 'DELETE').then(function(){
      $scope.getChannels()
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(error.statusText + ' Entrada duplicada')
    })
  }

  $scope.createDependencies = function() {
    $scope.data.forEach(each => {
      each['childs'] = $scope.data.filter(filtered => {
        return filtered.parent === each.id
      })
    })

    fathers = $scope.data.filter(filtered => {
      return filtered.parent == 0
    })

    $scope.channels = fathers
  }

  $scope.viewChilds = function(channelId) {
    $scope.channelSelected = $scope.data.filter(filtered => {
      return filtered.id === channelId
    })[0]

    if ($scope.lastChannelId == channelId)
      $scope.inChilds = !$scope.inChilds
    else
      $scope.inChilds = true
    
    console.log('vieww', $scope.inChilds)
    $scope.lastChannelId = channelId
  }      

  $scope.__init__()

})
