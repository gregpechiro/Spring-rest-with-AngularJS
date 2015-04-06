<!doctype html>
<html lang="en" ng-app="crudApp">
	<head>
		<meta charset="utf-8">
		<title>CRUD</title>
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="/static/css/style.css">
		<link rel="stylesheet" href="/static/css/sort.css">
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular-route.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular-resource.js"></script>
		<script src="https://rawgithub.com/angular-ui/ui-sortable/master/src/sortable.js"></script>
		<script src="/static/js/app.js"></script>
		<script src="/static/js/controllers.js"></script>
		<script src="/static/js/services.js"></script>
		<script src="/static/js/filters.js"></script>
		<script src="/static/js/directives.js"></script>
	</head>
	<body>
		<div class="container">
			<div ng-view class="view-frame"></div>
		</div>
		<script>
			function binarySearch(array, target, lb, ub) {
				if (lb > ub) {
					return -1;
				}
				var mid = Math.floor((lb + ub) / 2);
				var val = array[mid];
				if (val > target) {
					return binarySearch(array, target, lb, mid - 1);
				}
				if (val < target) {
					return binarySearch(array, target, mid + 1, ub);
				}
				return mid;
			}

			function removeValue(array, target) {
				sorted = array.sort();
			    var index = binarySearch(sorted, target, 0, array.length-1);
			    var newList = sorted.slice(0, index);
			    return newList.concat(sorted.slice(index + 1, sorted.length));
			}
		</script>
	</body>
</html>