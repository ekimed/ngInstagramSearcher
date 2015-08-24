angular.module('myInstaApp', [])
	.controller('myCtrl', function ($scope, $http) {
		var url,
			request,
			parsed_data;

		var parser = function (data) {
			data = data.data;
			var result = [];

			for (var i = 0; i < data.length; i++) {
				if (data[i].images.low_resolution) {
					result.push(data[i].images.low_resolution);
				}
			}

			return result;
		};

		$scope.showText = false;

		$scope.submit = function (form) {
			url = 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent'; 
			request = {
				client_id: 'afa76b5149a44e5bb53f871ec2682479',
				callback: 'JSON_CALLBACK'
			};

			$http({
				method: 'JSONP',
				url: url,
				params: request
			})
			.success(function (result) {
				parsed_data = parser(result);
				$scope.numberResult = parsed_data.length;
				$scope.items = parsed_data;
				$scope.showText = true;

				form.$setPristine();
				$scope.tag = null;


			})
			.error(function (err) {
				console.log(err);
			})

		}
	})