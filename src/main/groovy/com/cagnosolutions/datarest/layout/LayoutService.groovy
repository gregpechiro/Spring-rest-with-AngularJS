package com.cagnosolutions.datarest.layout

import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
/**
 * Created by greg on 2/12/15.
 */

@CompileStatic
@Service
class LayoutService {
	
	@Autowired
	LayoutRepository repo
	
	List<Layout> findAll() {
		repo.findAll()
	}
	
	Layout findOne(Integer id) {
		repo.findOne(id)
	}
	
	def save(Layout layout) {
		repo.save(layout)
	}
	
	Layout findByName(String name) {
		repo.findByName(name)
	}

	def mergeProperties(source, target) {
		source.properties.each { key, value ->
			if (target.hasProperty(key as String) && !((key as String) in ['class', 'metaClass']) && value != null)
				target[key as String] = value
		}
	}
}

