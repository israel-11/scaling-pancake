var app = angular.module("users")
    .controller('MainController', function(userService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog, $location, $rootScope, $q)
    {

    var self = this;
    self.toggleList   = toggleUsersList;
    $scope.name='Israel';
    $scope.receiver = false;
    $scope.loading=false;
    $scope.senderName = '';
    $scope.senderPhone = '';
    $scope.senderEmail = '';
    $scope.senderAddress = '';
    $scope.senderInstructions = '';
    $scope.receiverName = '';
    $scope.receiverPhone = '';
    $scope.receiverAddress = '';

    $scope.route = function(path){
        $location.path(path);
    }

    $scope.receiverData = function(){
        $scope.loading = true;
        $scope.receiver = true;
        setTimeout(function(){ $scope.loading = false; }, 3000);
    }

    $scope.senderData = function(){
        $scope.loading = true;
        $scope.receiver = false;
        setTimeout(function(){ $scope.loading = false; }, 3000);
    }

    $scope.setRequest = function(){
        var object = {
            'puname' : $scope.senderName,
            'puphone' : $scope.senderPhone,
            'puemail' : $scope.senderEmail,
            'puaddress' : $scope.senderAddress,
            'puspecinst' : $scope.senderInstructions,
            'doname' : $scope.receiverName,
            'dophone' : $scope.receiverPhone,
            'doaddress' : $scope.receiverAddress
        }
        console.log(object);
    }
    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

});
