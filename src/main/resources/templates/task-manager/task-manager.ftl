<html lang="en" ng-app="taskManagerApp">
	<head>
		<meta charset="UTF-8">
		<title>Task Manager</title>
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.0/angular-animate.min.js"></script>
		<script src="/static/js/app.js"></script>
	</head>
	<body>
		<div ng-controller="taskManagerController">

			<!-- title/header -->
			<div class="container">
				<div class="jumbotron">
					<h1>Task Manager <small>By Scott Cagno</small></h1>
				</div>
			</div>
			<!-- title/header -->

			<!-- task panel (view/edit) -->
			<div id="task-panel" class="fadein fadeout showpanel panel" ng-show="toggle">
				<div class="panel-heading">
					<i class="panel-title-icon fa fa-tasks"></i>
					<span class="panel-title">
						Recent Tasks
					</span>
					<div class="panel-heading-controls">
						<button ng-click="toggle = !toggle" class="btn-panel">
							Add New Task
						</button>
						<button class="btn-panel"
								confirmed-click="archiveTasks()"
									ng-confirm-click="Would you like to archive completed tasks?">
							Clear completed tasks
						</button>
					</div>
				</div>
				<div class="panel-body">
					<div class="task" ng-repeat="task in tasks">
    					<span ng-if="task.taskPriority=='HIGH'" class="priority priority-red">
							{{task.taskPriority}}
    					</span>
    					<span ng-if="task.taskPriority=='MEDIUM'" class="priority priority-yellow">
							{{task.taskPriority}}
    					</span>
    					<span ng-if="task.taskPriority=='LOW'" class="priority priority-green">
							{{task.taskPriority}}
    					</span>
						<div class="action-checkbox">
							<label for="{{task._links.self.href}}" ></label>
							<input id="{{task._links.self.href}}" type="checkbox" value="{{task._links.self.href}}"
								   ng-checked="selection.indexOf(task._links.self.href) > -1"
								   		ng-click="toggleSelection(task._links.self.href)" />
						</div>
						<div ng-if="task.taskStatus=='COMPLETED'">
							<a href="#" class="checkedClass">
								{{task.taskName}}
								<span class="action-status">
									{{task.taskStatus}}
								</span>
							</a>
						</div>
						<div ng-if="task.taskStatus=='ACTIVE'">
							<a href="#" class="uncheckedClass">
								{{task.taskName}}
								<span class="action-status">
									{{task.taskStatus}}
								</span>
							</a>
						</div>

					</div>
				</div>
			</div>
			<!-- task panel (view) -->

			<!-- task panel (add) -->
			<div id="add-task-panel" class="fadein fadeout addpanel panel" ng-hide="toggle">
				<div class="panel-heading">
					<i class="panel-title-icon fa fa-plus"></i>
					<span class="panel-title">Add Task</span>
					<div class="panel-heading-controls">
						<button ng-click="toggle = !toggle" class="btn-panel">Show All Tasks</button>
					</div>
				</div>
				<div class="panel-body">
					<div class="task" >
						<table class="add-task">
							<tr>
								<td>Task Name:</td>
								<td><input type="text" ng-model="taskName"/></td>
							</tr>
							<tr>
								<td>Task Description:</td>
								<td><input type="text" ng-model="taskDesc"/></td>
							</tr>
							<tr>
								<td>Task Status:</td>
								<td>
									<select ng-model="taskStatus" ng-options="status as status for status in statuses">
										<option value="">-- Select --</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>Task Priority:</td>
								<td>
									<select ng-model="taskPriority" ng-options="priority as priority for priority in priorities">
										<option value="">-- Select --</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>
									<button ng-click="addTask()" class="btn-panel-big">Add New Task</button></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<!-- task panel (add) -->

		</div>
	</body>
</html>