package com.cagnosolutions.datarest.entities.user

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
interface UserRepository extends JpaRepository<User, Integer> {
	User findByUsername(@Param("username") String username)
}