package com.cagnosolutions.datarest.layout

import groovy.transform.CompileStatic

import javax.persistence.Entity
import javax.persistence.Id

/**
 * Created by greg on 2/12/15.
 */
@CompileStatic
@Entity
class Layout {
	
	@Id
	Integer id
	String name, postition1, postition2, postition3, postition4
}
