var app = angular.module("users")
    .controller('RequestController', function(userService, $mdSidenav, $mdBottomSheet, $timeout, $log, $scope, $mdDialog, $location, $rootScope, $q)
    {

    $scope.senderName = '';
    $scope.senderPhone = '';
    $scope.senderEmail = '';
    $scope.senderAddress = '';
    $scope.senderInstructions = '';
    $scope.receiverName = '';
    $scope.receiverPhone = '';
    $scope.receiverAddress = '';

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
        swal("Success", "Request has been sent to hauler!", "success");
        $scope.senderName = '';
        $scope.senderPhone = '';
        $scope.senderEmail = '';
        $scope.senderAddress = '';
        $scope.senderInstructions = '';
        $scope.receiverName = '';
        $scope.receiverPhone = '';
        $scope.receiverAddress = '';
        $scope.receiver = false;
    }

});
