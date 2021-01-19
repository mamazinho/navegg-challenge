challenge.controller('ChannelsCtrl', function($scope, HttpFctr){

  $scope.__init__ = function(){
    $scope.channels = []
    $scope.data = []
    $scope.inChilds = false
    $scope.treeIds = []
    $scope.selectedChannels = {}
    $scope.lastChannelId = 0
    $scope.openCreateModal = false
    $scope.openEditModal = false
    $scope.createChannel = {
      'name': '',
      'users': '',
      'parent': '',
      'percent': '',
      'status': '',
    }
    $scope.editChannel = {
      'id': '',
      'name': '',
      'users': '',
      'parent': '',
      'percent': '',
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

  $scope.editModal = function(channel) {
    $scope.openEditModal = true
    $scope.editChannel.id = channel.id
    $scope.editChannel.name = channel.name
    $scope.editChannel.users = channel.users
    $scope.editChannel.parent = channel.parent
    $scope.editChannel.percent = channel.percent
    $scope.editChannel.status = channel.status
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
        return filtered.parent == each.id
      })
    })

    fathers = $scope.data.filter(filtered => {
      return filtered.parent == 0
    })

    $scope.channels = fathers
  }

  $scope.viewChilds = function(channelId) {
    if (!$scope.treeIds.includes(channelId)) {
      var child = ($scope.data.filter(filtered => filtered.id == channelId)[0])
      $scope.treeIds.push(child['id'])
      $scope.selectedChannels[child['id']] = child
    } else {
      $scope.treeIds.splice($scope.treeIds.findIndex((channel) => channel == channelId), 1)
      delete $scope.selectedChannels[channelId]
    }
    
    $scope.lastChannelId = channelId
  }      

  $scope.__init__()

})
