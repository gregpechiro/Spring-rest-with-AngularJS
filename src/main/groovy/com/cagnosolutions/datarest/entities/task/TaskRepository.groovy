package com.cagnosolutions.datarest.entities.task

import groovy.transform.CompileStatic
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource

/**
 * Created by Scott Cagno.
 * Copyright Cagno Solutions. All rights reserved.
 */

@CompileStatic
@RepositoryRestResource
interface TaskRepository extends JpaRepository<Task, Integer> {
	List<Task> findByTaskArchived(@Param("archivedfalse") int taskArchivedFalse)
	List<Task> findByTaskStatus(@Param("status") String taskStatus)
}