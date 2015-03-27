myApp.controller('attributeSectionCtrl', [ '$scope','$rootScope', '$http',
	'$location','attributeSection','growl','$modal','$routeParams', '$timeout',
	function($scope,$rootScope, $http, $location, attributeSection, growl, 
		$modal, $routeParams, $timeout){

		$scope.languageList = [{"name":'German', "iso":'de'},
													 {"name":'English', "iso":'en'}
													];

		$scope.init_page = function () {
			$scope.attributeSection={};
			$scope.attributeSection.orderNo = 0;
			$scope.attributeSection.descriptions = [{"language":'en', "description":null}];
			$scope.attributeSection.names = [{"language":'en', "name":null}];
			$timeout(function () {
	      $scope.attributeSection.orderNo = null;
	    });
		}

		$scope.master = {
			// $scope.attributeSection.timestamp.createdBy = 'jcadmin';
			// $scope.attributeSection.timestamp.updatedBy = 'jcadmin';
		};

		$scope.refactorData = function (attributeSection_details) {
			for(var i=0; i<attributeSection_details.descriptions.length; i++) {
				if(attributeSection_details.descriptions[i].description == null 
					|| attributeSection_details.descriptions[i].description == "") {
					if(attributeSection_details.descriptions.length == 1){
						attributeSection_details.descriptions[i] = {"language":'en', "description": ''};
					} else {
						$scope.remove_desc(attributeSection_details.descriptions, i);
					}
				}
			}
			for(var i=0; i<attributeSection_details.names.length; i++) {
				if(attributeSection_details.names[i].name == null 
					|| attributeSection_details.names[i].name == "") {
					if(attributeSection_details.names.length){
						attributeSection_details.names[i] = {"language":'en', "description": ''};
					} else {
						$scope.remove_name(attributeSection_details.names, i);
					}
				}
			}
		}
		
		$scope.submit = function(attributeSection_details){
			if($scope.attributeSectionForm.$valid) {
				$scope.refactorData(attributeSection_details);
				getObject(attributeSection_details);
				attributeSection.save({url:'attributeSection'}, attributeSection_details).$promise.then(function(data){
					$scope.attributeSection = data;
					$scope.valueDetails = $scope.attributeSection.timestamp;
					if(data.statusCode != 403){
						growl.addSuccessMessage('Attribute Section created succesfully');
					 	$scope.attributeSection_view(data._id);
					} else {
						growl.addErrorMessage(data.message);
						$scope.attributeSection = attributeSection_details;
					}
				}).catch(function(error){
					growl.addErrorMessage('Oops! Something went wrong');
				});
			}
			else
				{
					var modalInstance = $modal.open({
					templateUrl: 'alert.html',
					controller: 'ModalInstanceCtrl',
					});
				}
		};

		/* Adding multiple descriptions and names */
		$scope.add_name = function (list) {	
			list.length++;
			for(var i=0; i < list.length; i++){
				k= list.length-1;
				if(i == k){
					if(list[k-1].name != null && 
						list[k-1].name != "" && 
						i <	$scope.languageList.length){
						list[i] = {"language":'de', "name": null};
					} else {
						list.length--;
						if(list.length ==	$scope.languageList.length)
							growl.addWarnMessage('You are not allowed to add more than limit');
					}
				}
			}		
			$scope.checkLanguage(list);
		}

		$scope.remove_name =function (list, index) {
			if(list.length == 1){
				list[0] = {"language":'en', "name": null};
			} else {
				list.splice(index, 1);
			}
		}

		$scope.delete_name = function (list, index) {
			if(list.length != 1){
				if(list[index].name == "")
					list.splice(index, 1);
			}
		}

		$scope.add_desc = function (list) {	
			list.length++;
			for(var i=0; i < list.length; i++){
				k= list.length-1;
				if(i == k){
					if(list[k-1].description != null && 
						list[k-1].description != "" && 
						i <	$scope.languageList.length){
						list[i] = {"language":'de', "description": null};
					} else {
						list.length--;
						if(list.length ==	$scope.languageList.length)
							growl.addWarnMessage('You are not allowed to add more than limit');
					}
				}
			}		
			$scope.checkLanguage(list);
		}

		$scope.remove_desc =function (list, index) {
			if(list.length == 1){
				list[0] = {"language":'en', "description": null};
			} else {
				list.splice(index, 1);
			}
		}

		$scope.delete_desc = function (list, index) {
			if(list.length != 1){
				if(list[index].description == "")
					list.splice(index, 1);
			}
		}

  	$scope.changeLanguage1 = function (list, id) {
			for(var i = 0; i < list.length ; i++){
				if(list[i].name != "" && list[i].name != null && id == i){
					growl.addWarnMessage('You have changed the language please check name');
				}
			}
			$scope.checkLanguage(list);
		}
		$scope.changeLanguage2 = function (list, id) {
			for(var i = 0; i < list.length ; i++){
				if(list[i].description != "" && list[i].description != null && id == i){
					growl.addWarnMessage('You have changed the language please check description');
				}
			}
			$scope.checkLanguage(list);
		}
		$scope.checkLanguage = function (list) {
			if(list.length == $scope.languageList.length) {
				for(var i = 0; i < list.length ; i++){
					if(list[0].language == 
						list[1].language){
						growl.addWarnMessage('You have selected same language more than once');
					}
				}
			}
		}
		/*--------------------------------*/

	/****************** Dialog Boxes Handlers *****************/
		
		$scope.closeModal = function () {
			$('#confirmationDailogBox').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		} 

		$scope.isCreateSubGroup = function(confirm){
			$scope.redirectAttr = false;
			if(confirm == true){
				$scope.createSGPage = true;
				$scope.classificationGroup = cgDetails;
			} else {
				$scope.createSGPage = false;
			}
		}

		$scope.isConformed = function(){
			$scope.closeModal();
			$scope.cancel_view();
		}
/******************************************************/

		$scope.reset = function() {
			$scope.init_page();
		};

		$scope.edit_attributeSection = function(id){
			$scope.changeView.search=true;
			$scope.obj.id=id;
			$scope.page = 'edit';
			view_attributeSection();
		};

		$scope.attributeSection_view = function(id)
		{
			$scope.changeView.search=true;
			$scope.obj.id=id;
			$scope.page = 'view';
			view_attributeSection();
		};

		$scope.cancel_view = function(){
			$scope.changeView.search=false;
		};

		
		$scope.view_page = function(){
			if($scope.page == 'new'){
				$scope.page = 'new';
			}
			else if($scope.page == 'edit'){
				$scope.page = 'edit';
				view_attributeSection();
			}
			else{
				$scope.page = 'view';
				view_attributeSection();
			}
		};

		$scope.update_attributeSection = function(attributeSection_details,id) {
			if($scope.attributeSectionForm.$valid) {
				$scope.refactorData(attributeSection_details);
				getObject(attributeSection_details);
				attributeSection.update({url:'attributeSection',attributeSection_id:id},attributeSection_details).$promise.then(function(data){
					growl.addSuccessMessage('Attribute Section updated Succesfully');
					$scope.attributeSection_view(id);
				}).catch(function(error){
					growl.addErrorMessage('oops! Something went wrong');
				})
			}
			else {
				var modalInstance = $modal.open({
					templateUrl: 'alert.html',
					controller: 'ModalInstanceCtrl',
				});
			}
		};

		$scope.reset();
		$scope.view_page();

		function view_attributeSection(){
			attributeSection.get({url:'attributeSection',attributeSection_id:$scope.obj.id}).$promise.then(function(data){
				$scope.attributeSection = data;
				$scope.valueDetails = $scope.attributeSection.timestamp;
			}).catch(function(error){
				growl.addErrorMessage('oops! Something went wrong');
			})
		}
		function getObject(theObject) {
			var result = null;	
			for(var prop in theObject) {
				if(theObject[prop]==""){
					theObject[prop] = " ";
				}
				if(theObject[prop] instanceof Object)
					result = getObject(theObject[prop]);
			}
		};
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