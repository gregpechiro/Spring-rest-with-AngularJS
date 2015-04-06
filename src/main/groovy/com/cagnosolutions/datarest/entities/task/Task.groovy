package com.cagnosolutions.datarest.entities.task

import groovy.transform.CompileStatic
import javax.persistence.*

/**
 * Created by Scott Cagno.
 * Copyright Cagno Solutions. All rights reserved.
 */

@CompileStatic
@Entity
class Task {

	@Id
	@GeneratedValue
	int id
	String taskName
	@Column(columnDefinition = "blob")
	String taskDescription
	String taskPriority
	String taskStatus
	int taskArchived = 0
}