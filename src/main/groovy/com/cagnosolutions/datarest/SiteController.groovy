package com.cagnosolutions.datarest

import groovy.transform.CompileStatic
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

/**
 * Created by Scott Cagno.
 * Copyright Cagno Solutions. All rights reserved.
 */

@CompileStatic
@Controller
class SiteController {

	@RequestMapping(value = "/task-manager")
	String manager() {
		"task-manager/task-manager"
	}
	
	@RequestMapping(value = "/")
	String root() {
		"index"
	}

}
