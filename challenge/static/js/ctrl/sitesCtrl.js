challenge.controller('SitesCtrl', function($scope, HttpFctr){

  $scope.__init__ = function(){
    $scope.sites = []
    $scope.openCreateModal = false
    $scope.openEditModal = false
    $scope.createSite = {
      'name': '',
      'urls': '',
      'categories': '',
      'status': '',
    }
    $scope.editSite = {
      'id': '',
      'name': '',
      'urls': '',
      'categories': '',
      'status': '',
    }
    $scope.getSites()
  }

  $scope.getSites = function() {
    HttpFctr('sites', 'GET').then(function(response){
      $scope.sites = response
    }).catch((error) => {
      console.log('ERROR >>', error)
    })
  }

  $scope.createNewSite = function() {
    var data = JSON.stringify($scope.createSite)
    HttpFctr('sites', 'POST', {data}).then(function(){
      $scope.getSites()
      $scope.openCreateModal = false
      $scope.createSite = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(error.statusText + ' Entrada duplicada')
    })
  }

  $scope.editModal = function(site) {
    $scope.openEditModal = true
    $scope.editSite.id = site.id
    $scope.editSite.name = site.name
    $scope.editSite.urls = site.urls
    $scope.editSite.categories = site.categories
    $scope.editSite.status = site.status
  }

  $scope.updateSite = function() {
    var data = JSON.stringify($scope.editSite)
    HttpFctr(`sites/${$scope.editSite.id}`, 'PUT', {data}).then(function(){
      $scope.getSites()
      $scope.openEditModal = false
      $scope.editSite = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(error.statusText + ' Entrada duplicada')
    })
  }

  $scope.deleteSite = function(site_id) {
    HttpFctr(`sites/${site_id}`, 'DELETE').then(function(){
      $scope.getSites()
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(error.statusText + ' Entrada duplicada')
    })
  }

  $scope.__init__()

})
