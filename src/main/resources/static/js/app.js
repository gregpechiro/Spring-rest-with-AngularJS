"use strict";

var taskManagerModule = angular.module('taskManagerApp', ['ngAnimate']);

taskManagerModule.controller('taskManagerController', function ($scope,$http) {

	/*
	 *	INIT
	 */

	var urlBase="api";
	$scope.toggle=true;
	$scope.selection = [];
	$scope.statuses=['ACTIVE','COMPLETED'];
	$scope.priorities=['HIGH','LOW','MEDIUM'];
	$http.defaults.headers.post["Content-Type"] = "application/json";

	/*
	 *	FIND ALL TASKS
	 */

	function findAllTasks() {
		$http.get(urlBase + '/tasks/search/findByTaskArchived?archivedfalse=0').
			success(function (data) {
				if (data._embedded != undefined)
					$scope.tasks = data._embedded.tasks;
				else
					$scope.tasks = [];
				for (var i = 0; i < $scope.tasks.length; i++) {
					if ($scope.tasks[i].taskStatus == 'COMPLETED')
						$scope.selection.push($scope.tasks[i].taskId);
				}
				$scope.taskName="";
				$scope.taskDesc="";
				$scope.taskPriority="";
				$scope.taskStatus="";
				$scope.toggle='!toggle';
			});
	}
	findAllTasks();

	/*
	 *	ADD NEW TASK
	 */

	$scope.addTask = function addTask() {
		if($scope.taskName=="" || $scope.taskDesc=="" || $scope.taskPriority == "" || $scope.taskStatus == "")
			alert("**Please fill out entire form!");
		else{
			$http.post(urlBase + '/tasks', {
				taskName: $scope.taskName,
				taskDescription: $scope.taskDesc,
				taskPriority: $scope.taskPriority,
				taskStatus: $scope.taskStatus
			})
			.success(function(data, status, headers) {
				console.log('Task added');
				console.log("Might be good to GET " + headers()["location"] + " and append the task.");
				findAllTasks();
				// Grabbing everything on each call might be a little too expensive, not sure yet
				// A better solution might be to append $http.get(headers()["location"]) to the list
			});
		}
	};

	/*
	 *	TOGGLE SELECTION BY TASK.ID
	 */

	$scope.toggleSelection = function toggleSelection(taskUri) {
		var idx = $scope.selection.indexOf(taskUri);
		// if currently selected, PATCH to ACTIVE state
		if (idx > -1) {
			$http.patch(taskUri, { taskStatus: 'ACTIVE' })
				.success(function(data) {
					console.log("Task unmarked");
					findAllTasks();
				});
			$scope.selection.splice(idx, 1);
		}
		// if newly selected, PATCH to COMPLETED state
		else {
			$http.patch(taskUri, { taskStatus: 'COMPLETED' })
				.success(function(data) {
					console.log("Task marked completed");
					findAllTasks();
				});
			$scope.selection.push(taskUri);
		}
	};

	/*
	 *	ARCHIVE COMPLETED TASKS
	 */

	$scope.archiveTasks = function archiveTasks() {
		$scope.selection.forEach(function(taskUri) {
			if (taskUri != undefined) {
				$http.patch(taskUri, { taskArchived: 1});
			}
		});
		console.log("Tasks successfully Archived");
		console.log("Risky to run without ensuring all patches are done. Consider a when call??");
		findAllTasks();
	};

});

/*
 *	TOGGLE ANGULAR CONFIRM DIALOG
 */

taskManagerModule.directive('ngConfirmClick', [
	function(){
		return {
			link: function (scope, element, attr) {
				var msg = attr.ngConfirmClick || "Are you sure?";
				var clickAction = attr.confirmedClick;
				element.bind('click',function (event) {
					if ( window.confirm(msg) ) {
						scope.$eval(clickAction);
					}
				});
			}
		};
	}
]);