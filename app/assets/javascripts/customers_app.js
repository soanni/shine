var app = angular.module(
    'customers',
    [
        'ngRoute',
        'ngResource',
        'ngMessages',
        'templates'
    ]
);
app.config(
    [
        "$routeProvider",
        function($routeProvider){
            $routeProvider.when("/", {
                controller: "CustomerSearchController",
                templateUrl: "customer_search.html"
            }).when("/:id",{
                controller: "CustomerDetailController",
                templateUrl: "customer_detail.html"
            });
        }
    ]
);

app.controller("CustomerCreditCardController",[
        "$scope","$resource",
    function($scope,$resource){
        var CreditCardInfo = $resource('/fake_billing.json');
        $scope.setCardholderId = function(cardholderId){
            $scope.creditCard = CreditCardInfo.get({"cardholder_id": cardholderId});
        };
        //$scope.creditCard = CreditCardInfo.get({"cardholder_id": 1234});
    }
]);

app.controller("CustomerDetailController",[
    "$scope","$routeParams","$resource",
    function($scope, $routeParams, $resource){
        $scope.customerId = $routeParams.id;
        var Customer = $resource('/customers/:customerId.json');
        $scope.customer = Customer.get({"customerId": $scope.customerId});
        $scope.save = function(){
            if($scope.form.$valid){
                alert("Save!");
            }
        };
    }
]);

//app.controller("CustomerDetailController",[
//    "$scope","$http","$routeParams","$resource",
//    function($scope, $http, $routeParams, $resource){
//        var customerId = $routeParams.id;
//        var Customer = $resource('/customers/:customerId.json');
//        $scope.customer = Customer.get({ "customerId": customerId });
//
//        //alert("Ajax Call Initiated");
//        //$scope.customer = {};
//        //$http.get(
//        //    "/customers/" + customerId + ".json"
//        //).then(function(response){
//        //    $scope.customer = response.data;
//        //},function(response){
//        //    alert("There was a problem: " + response.status);
//        //});
//    }
//]);

app.controller("CustomerSearchController", [
			"$scope","$http","$location",
	function($scope,$http, $location) {
        var page = 0;
        $scope.viewDetails = function(customer){
            $location.path("/" + customer.id);
        };
        $scope.customers = [];
		$scope.search = function(searchTerm) {
            if(searchTerm.length < 3){
                return;
            }
            $http.get("/customers.json",{"params": {"keywords": searchTerm, "page": page}}
            ).then(function(response){
                $scope.customers = response.data;
            }, function(response){
                alert("There was a problem: " + response.status);
            });
            //$scope.customers = [
            //    {
            //        "first_name":"Andrey",
            //        "last_name":"Solodov",
            //        "email":"legandr.86@gmail.com",
            //        "username":"soanni",
            //        "created_at":"2016-01-01"
            //    },
            //    {
            //        "first_name":"Elmirushka",
            //        "last_name":"Murakaeva",
            //        "email":"elmirushka@gmail.com",
            //        "username":"elmirushka",
            //        "created_at":"2016-01-0"
            //    }
            //];
		};

        $scope.previousPage = function(){
            page = page - 1;
            $scope.search($scope.keywords);
        };

        $scope.nextPage = function(){
            page = page + 1;
            $scope.search($scope.keywords);
        }
	}
]);