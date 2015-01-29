package com.cagnosolutions.datarest

import groovy.transform.CompileStatic
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration
import org.springframework.hateoas.config.EnableHypermediaSupport

/**
 * Created by Scott Cagno.
 * Copyright Cagno Solutions. All rights reserved.
 */

@CompileStatic
@Configuration
@ComponentScan
@EnableJpaRepositories
@EnableAutoConfiguration
@Import(RepositoryRestMvcConfiguration.class)
@EnableHypermediaSupport(type = EnableHypermediaSupport.HypermediaType.HAL)
public class Application {
	static void main(String... args) {
		SpringApplication.run Application, args
	}
}