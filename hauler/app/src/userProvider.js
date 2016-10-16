var app = angular.module("users")
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider.when('/map',
    {
      templateUrl:'src/hauler/map.html'
    });
    $routeProvider.when('/settings',
    {
      templateUrl:'src/settings/settings.html'
    });
    $routeProvider.otherwise(
    {
      redirectTo:'/map'
    }
  );
});
