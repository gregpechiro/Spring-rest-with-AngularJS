package com.cagnosolutions.datarest.layout

import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
/**
 * Created by greg on 2/12/15.
 */

@CompileStatic
@RestController
@RequestMapping("/layout")
class LayoutController {
	
	@Autowired
	LayoutService layoutService
	
	@RequestMapping(method = RequestMethod.GET)
	List<Layout> findAllLayouts() {
		layoutService.findAll()
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	Layout findOneLayout(@PathVariable Integer id) {
		layoutService.findOne(id)
	}
	
	@RequestMapping(method = RequestMethod.POST)
	def addLayout(Layout newLayout) {
		def layout = layoutService.findByName(newLayout.name)
		if (layout != null) {
			layoutService.mergeProperties(newLayout, layout)
			layoutService.save(layout)
		} else {
			layoutService.save(newLayout)
		}
	}
}
