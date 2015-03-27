myApp.controller('attributeSectionSearchCtrl', [ '$scope','$rootScope', 
	'$http','$location','attributeSection','growl','$modal','$routeParams',
	'blockUI',
	function($scope,$rootScope, $http, $location, attributeSection, 
		growl, $modal, $routeParams, blockUI){

		$scope.master = {};
		$scope.changeView.search=false;
		$scope.obj={id:""};
		
		$scope.edit_attributeSection = function(id){
			$scope.changeView.search=true;
			$scope.obj.id=id;
			$scope.page = 'edit';
		};
		
		$scope.new_page = function(){
			$scope.changeView.search=true;
			$scope.page = 'new';
		};

		
		$scope.reset_search = function() {
			$scope.searchQuery = angular.copy($scope.master);
		};
		$scope.search = function(){
			// Block the user interface
    	blockUI.start();
			var rqstData = customTransform();
			attributeSection.searchQuery({url:'attributeSectionSearch'},rqstData).$promise.then(function(data){
				$scope.masterCheck = false;
				$scope.searchResult = data;
				$scope.currentPage = 0;
				$scope.groupToPages();
				// Unblock the user interface
      	blockUI.stop();	
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
			if($scope.min > 0){ 
				$scope.min--;
			}
			if($scope.max > 5){ 
				$scope.max--;
			}
		};

		$scope.nextPage = function () {
			if ($scope.currentPage < $scope.pagedItems.length - 1) {
				$scope.currentPage++;
			}
			$scope.limit = $scope.pagedItems.length;
			if($scope.min < $scope.limit && $scope.min <= $scope.limit - 6) {
				$scope.min++;
			}
			if($scope.max < $scope.limit && $scope.min <= $scope.limit) {
				$scope.max++;
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

		$scope.delete_one = function(id,index){
			var modalInstance = $modal.open({
				templateUrl: 'myModalContent.html',
				controller: 'ModalInstanceCtrl',
			});
			modalInstance.result.then(function (selectedItem) {
			attributeSection.delet({url:'attributeSection',attributeSection_id:id}).$promise.then(function(data){
				if(data.statusCode !== 400){
					$scope.searchResult.splice(index,1);
					$scope.filtered();
					growl.addSuccessMessage('Attribute Section removed Succesfully');
				}
				else growl.addErrorMessage(data.message);
			}).catch(function(error){
				growl.addErrorMessage("oops! Something went wrong");
			})
			});
		};

		function customTransform(){
			var temp = [];
			if($scope.searchSectionList){
				var dump1 = $scope.searchQuery;
				$scope.searchQuery = $scope.searchSectionList;
			}
			for(key in $scope.searchQuery){
				switch(key){
					case 'attributeSectionId':
					case 'name':
					case 'description':
				if($scope.searchQuery[key]!=""){
					temp.push({
						"key": key,
						"value": $scope.searchQuery[key]
					})						
				}
				}
			}
			if(dump1 != undefined)
				$scope.searchQuery = dump1;
			return temp;
		}

		$scope.pagedItems = [];
		$scope.currentPage = 0;
		$scope.filteredItems = [];
	 	$scope.itemsPerPage = 5;
	 	$scope.min = 0;
	 	$scope.max =5;
		$scope.groupToPages();
}]);

myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
	$scope.ok = function () {
		$scope.item = 'yes';
		$modalInstance.close($scope.item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});