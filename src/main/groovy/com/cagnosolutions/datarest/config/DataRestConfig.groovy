package com.cagnosolutions.datarest.config

import groovy.transform.CompileStatic
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration

/**
 * Created by Scott Cagno.
 * Copyright Cagno Solutions. All rights reserved.
 */

@CompileStatic
@Configuration
@Import(RepositoryRestMvcConfiguration.class)
class DataRestConfig extends RepositoryRestMvcConfiguration {

	void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		super.configureRepositoryRestConfiguration config
		config.baseUri = new URI("api")
	}
}
