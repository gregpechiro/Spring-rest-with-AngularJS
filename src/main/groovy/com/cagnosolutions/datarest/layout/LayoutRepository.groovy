package com.cagnosolutions.datarest.layout

import groovy.transform.CompileStatic
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

/**
 * Created by Scott Cagno.
 * Copyright Cagno Solutions. All rights reserved.
 */

@CompileStatic
interface LayoutRepository extends JpaRepository<Layout, Integer> {
	@Query("SELECT l FROM Layout l WHERE l.name=:name")
	Layout findByName(@Param("name") String name)
}