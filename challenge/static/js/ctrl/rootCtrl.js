challenge.controller('RootCtrl', function($scope, $rootScope){

    $scope.__init__ = function(){
      $rootScope.active_tab = 'channels'
    }
  
    $scope.__init__()
  
  })
  