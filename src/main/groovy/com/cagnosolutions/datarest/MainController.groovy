package com.cagnosolutions.datarest

import com.cagnosolutions.datarest.entities.task.Task
import com.cagnosolutions.datarest.entities.user.User
import groovy.transform.CompileStatic
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

/**
 * Created by greg on 2/12/15.
 */

@CompileStatic
@RestController
@RequestMapping("/info")
class MainController {
	
	@RequestMapping(value = "/tables", method = RequestMethod.GET)
	Map tables() {
		def map = [:]
		map.put("user", new User())
		map.put("task", new Task())
		map
	}
}
