myApp.controller('classificationGroupSearchCtrl', [ '$scope', '$http','$location','classificationGroup','growl','$modal','$routeParams','$rootScope',
	function($scope, $http, $location, classificationGroup, growl, $modal, $routeParams, $rootScope){

		$scope.master = {};

		$scope.obj={id:""};

		$scope.reset_search = function() {
			$scope.searchQuery = angular.copy($scope.master);
		};
		$scope.search = function(obj){
			obj['classificationRef'] = $rootScope.classification_id;
			var rqstData = customTransform(obj);
			classificationGroup.searchQuery({url:'classificationGroupSearch'},rqstData).$promise.then(function(data){
				$scope.searchVar.value = true;
				$scope.searchResult = [];
				$scope.searchResult = data;
				$scope.searchQuery.searchDirty = true;
				$scope.currentPage = 0;
				$scope.groupToPages();
			}).catch(function(error){
				growl.addErrorMessage('oops! Something went wrong');
			});
		};

		$scope.range = function (start, end) {
			var ret = [];
			if (!end) {
				end = start;
				start = 0;
			}
			for (var i = start; i < end; i++) {
				ret.push(i);
			}
			return ret;
		};

		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pagedItems.length - 1) {
				$scope.currentPage++;
			}
		};

		$scope.setPage = function () {
			$scope.currentPage = this.n;
		};

		$scope.groupToPages = function () {
			$scope.pagedItems = [];
			$scope.filteredItems = $scope.searchResult;
			$scope.filtered();
		};

		$scope.filtered = function () {
			if($scope.filteredItems){
				for (var i = 0; i < $scope.filteredItems.length; i++) {
					if (i % $scope.itemsPerPage === 0) {
						$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
					}
					else {
						$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
					}
				}
			}   
		};

		function customTransform(){
			var query = {};
			for(key in $scope.searchQuery){
				switch(key){
					case 'classificationGroupId':
					case 'description':
					case 'classificationRef':
				if($scope.searchQuery[key]!=""){
					query[key] = $scope.searchQuery[key];						
				}
				}
			}
			return query;
		}

		$scope.pagedItems = [];
		$scope.currentPage = 0;
		$scope.filteredItems = [];
	 	$scope.itemsPerPage = 5;
		$scope.groupToPages();
}]);
