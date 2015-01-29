<!doctype html>
<html lang="en" ng-app="userApp">
	<head>
		<meta charset="utf-8">
		<title>USERS</title>
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
		<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular-route.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.4/angular-resource.js"></script>
		<script src="/static/js/application.js"></script>
		<script src="/static/js/controllers.js"></script>
		<script src="/static/js/services.js"></script>
		<script src="/static/js/filters.js"></script>
	</head>
	<body>
	
		<div class="container">
			<div ng-view class="view-frame"></div>
		</div>
	
	</body>
</html>