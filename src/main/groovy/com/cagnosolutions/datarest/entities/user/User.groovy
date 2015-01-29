package com.cagnosolutions.datarest.entities.user

import groovy.transform.CompileStatic
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

/**
 * Created by Scott Cagno.
 * Copyright Cagno Solutions. All rights reserved.
 */

@CompileStatic
@Entity
class User {

	@Id
	@GeneratedValue
	int id
	String name
	String username
	String password
	String role = "ROLE_USER"
	short active = 1

}
