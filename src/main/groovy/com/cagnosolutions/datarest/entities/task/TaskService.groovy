package com.cagnosolutions.datarest.entities.task

import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
/**
 * Created by greg on 2/12/15.
 */

@CompileStatic
@Service
class TaskService {
	
	@Autowired
	TaskRepository repo
	
	List<Task> findAll() {
		repo.findAll()
	}
	
	Task findOne(Integer id) {
		repo.findOne(id)
	}
	
	def save(Task task) {
		repo.save(task)
	}
}
