angular.module('myInstaApp', ['ngMessages'])
	.controller('myCtrl', function ($scope, $http, $q) {
		var url,
			request,
			parsed_data;

		var parser = function (data) {
			data = data.data;
			var result = [];

			for (var i = 0; i < data.length; i++) {
				if (data[i].images.low_resolution) {
					data[i].images.low_resolution.link = data[i].link;
					result.push(data[i].images.low_resolution);
				}
			}

			return result;
		};

		var wait = function () {
			var defer = $q.defer();

			setTimeout(function () {
				defer.resolve();
			}, 2000);

			return defer.promise;
		}

		$scope.showText = false;
		$scope.res = {};

		$scope.submit = function (form) {
			url = 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent'; 
			request = {
				client_id: 'afa76b5149a44e5bb53f871ec2682479',
				callback: 'JSON_CALLBACK'
			};
			$scope.waitText = true;
			$http({
				method: 'JSONP',
				url: url,
				params: request
			})
			.success(function (result) {
				parsed_data = parser(result);

				// save copy of search tag
				$scope.copySearchTag = angular.copy($scope.tag);

				wait().then(function () {
					$scope.waitText = false;
					$scope.numberResult = parsed_data.length;
					$scope.items = parsed_data;
					
					// set search result text
					if (!parsed_data.length) {
						$scope.res['noResult'] = 'No results found.';
					} else {
						$scope.res['foundResult'] = parsed_data.length;
					}

					// clear search form
					form.$setPristine();
					$scope.tag = null;
				});
				

				

				

				


			})
			.error(function (err) {
				console.log(err);
				$scope.res['errorServer'] = err;
			})

		}
	})