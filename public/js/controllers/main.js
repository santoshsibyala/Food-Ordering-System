angular.module('foodController', [])

	// inject the FoodItems service factory into our controller
	.controller('mainController', ['$scope','$http','FoodItems', function($scope, $http, FoodItems) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.cart=false;
		$scope.total=0;
		$scope.foodItems=[
			{
				'name':'Pizza',
				'price':10
			},
			{
				'name':'Burger',
				'price':5
			},
			{
				'name':'Sandwich',
				'price':8
			},
			{
				'name':'Coffee',
				'price':3
			},
			{
				'name':'Hot Choclate',
				'price':4
			}
		];

		// GET =====================================================================
		// when landing on the page, get all foods and show them
		// use the service to get all the foods
		FoodItems.get()
			.success(function(data) {
				$scope.foods = data;
				$scope.cart=true; 
				$scope.loading = false;
			});
		function totalCost(){
			FoodItems.total()
				.success(function(data){
					$scope.total=data.sum;
			});
		}
		totalCost();
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFood = function(name,price) {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if (name != undefined && price != undefined) {
				$scope.formData.name=name;
				$scope.formData.price=price;
				$scope.loading = true;
				// call the create function from our service (returns a promise object)
				FoodItems.create($scope.formData)

					// if successful creation, call our get function to get all the new foods
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.foods = data; 
						totalCost();
						$scope.cart=true;// assign our new list of foods
					});
			}
		};

		// DELETE ==================================================================
		// delete a food after checking it
		$scope.deleteFood = function(id) {
			$scope.loading = true;
			FoodItems.delete(id)
				// if successful creation, call our get function to get all the new foods
				.success(function(data) {
					$scope.loading = false;
					$scope.cart=true;
					$scope.foods = data;// assign our new list of foods
					totalCost();
				});
		};
	}]);