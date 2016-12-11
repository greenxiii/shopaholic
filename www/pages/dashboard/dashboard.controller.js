app.controller('DashCtrl', ['$scope', '$ionicModal', '$localStorage', '$ionicPopup', function ($scope, $ionicModal, $localStorage, $ionicPopup) {
	var sh = this;
	sh.addProductToList = addProductToList;
	sh.createList = createList;
	sh.saveList = saveList;
	sh.showList = showList;
	sh.addPrice = addPrice;
	sh.newList = {};
	sh.productTitle = '';
	sh.newList.products = [];

	inizialize();

	function inizialize() {
		sh.productLists = $localStorage.productLists;
	}

	function showList(list) {
		sh.currentList = list;
		$ionicModal.fromTemplateUrl(
			'pages/dashboard/listView.html', {
				scope: $scope,
				sh: sh
			}
		)
			.then(function (modal) {
				$scope.modalShowList = modal;
				$scope.modalShowList.show();
			});
	}

	function saveList(newList) {
		sh.newList.title = newList.name.$viewValue;
		if ($localStorage.productLists) {
			$localStorage.productLists.push(sh.newList);
		} else {
			$localStorage.productLists = [];
			$localStorage.productLists.push(sh.newList);
		}
		sh.newList = {};
		$scope.modalCreateList.hide();
	}

	function createList() {
		$ionicModal.fromTemplateUrl(
			'pages/dashboard/addListForm.html', {
				scope: $scope,
				sh: sh
			}
		)
			.then(function (modal) {
				$scope.modalCreateList = modal;
				$scope.modalCreateList.show();
			});
	}

	function addProductToList(title) {
		if (title !== '' && sh.newList.products.indexOf(title) === -1) {
			sh.newList.products.push({ title: title, price: null });
			sh.productTitle = '';
		}
	}

	$scope.back = function () {
		if ($scope.modalShowList) {
			$scope.modalShowList.hide();
		} else if ($scope.modalCreateList) {
			$scope.modalCreateList.hide();
		}
	}

	function addPrice(currentProduct) {
		sh.currentProduct = currentProduct;
		var pricePopup = $ionicPopup.show({
			template: '<input type="number" ng-model="sh.currentProduct.price">',
			title: 'Add price',
			scope: $scope,
			buttons: [
				{ text: 'Cancel' }, {
					text: '<b>Save</b>',
					type: 'button-positive',
					onTap: function (e) {
						if (!sh.currentProduct.price) {
							//don't allow the user to close unless he enters model...
							e.preventDefault();
						} else {
							return currentProduct.price;
						}
					}
				}
			]
		});
		pricePopup.then(function (res) {
			sh.currentList.sum = sh.currentList.products.reduce(function (sum, current) {
				return sum + current.price;
			}, 0);
		});
	}

}]);