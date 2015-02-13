package com.cagnosolutions.datarest.entities.task

import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
/**
 * Created by greg on 2/12/15.
 */

@CompileStatic
@RestController
@RequestMapping("/task")
class TaskController {
	
	@Autowired
	TaskService taskService

	@RequestMapping(method = RequestMethod.GET)
	List<Task> findAllTasks() {
		taskService.findAll()
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	Task findOneTask(@PathVariable Integer id) {
		taskService.findOne(id)
	}

	@RequestMapping(method = RequestMethod.POST)
	def addTask(@RequestBody Task task) {
		taskService.save(task)
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	def saveTask(@RequestBody Task task) {
		taskService.save(task)
	}
	
	@RequestMapping(value = "/new", method = RequestMethod.GET)
	Task newTask() {
		new Task()
	}
}
