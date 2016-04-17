angular.module('foodService', [])

	// super simple service
	// each function returns a promise object 
	.factory('FoodItems', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/foods');
			},
			create : function(foodData) {
				return $http.post('/api/foods', foodData);
			},
			delete : function(id) {
				return $http.delete('/api/foods/' + id);
			},
			total: function(){
				return $http.get('/api/total');
			}
		}
	}]);