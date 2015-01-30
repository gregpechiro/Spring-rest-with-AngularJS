package com.cagnosolutions.datarest.config

import com.cagnosolutions.datarest.util.CustomAuthSuccess
import com.cagnosolutions.datarest.util.CustomCsrfFilter
import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.csrf.CsrfFilter
import org.springframework.security.web.csrf.CsrfTokenRepository
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository
import org.springframework.security.web.util.matcher.AntPathRequestMatcher

import javax.sql.DataSource

/**
 * Created by Scott Cagno.
 * Copyright Cagno Solutions. All rights reserved.
 */

@CompileStatic
@Configuration
@EnableWebMvcSecurity
class AuthenticationConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	DataSource dataSource;

	@Autowired
	void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("admin").password("admin").roles("ADMIN")
		auth.jdbcAuthentication().dataSource(dataSource).passwordEncoder(new BCryptPasswordEncoder())
				.usersByUsernameQuery("SELECT username, password, active FROM user WHERE username=?")
				.authoritiesByUsernameQuery("SELECT username, role FROM user WHERE username=?")
	}

	protected void configure(HttpSecurity http) throws Exception {

		def csrfFilter = customCsrfFilter() as CustomCsrfFilter

		http.addFilterAfter(csrfFilter, CsrfFilter.class)
			.headers()
			.cacheControl()
			.xssProtection()

		http.authorizeRequests()
			.antMatchers("/admin/**").hasAnyRole("ADMIN")
			.antMatchers("/user/**").hasAnyRole("ADMIN", "USER")
		//	.antMatchers("/api/**").hasAnyRole("ADMIN", "API")

		http.formLogin()
			.loginPage("/login").defaultSuccessUrl("/secure")
			.successHandler(new CustomAuthSuccess())

		http.httpBasic()

		http.logout()
			.invalidateHttpSession(true)
			.logoutSuccessUrl("/")
			.logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))

		http.sessionManagement()
			.maximumSessions(1)
			.expiredUrl("/login?expired")
			.maxSessionsPreventsLogin(false)
			.and()
			.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
		http.csrf().csrfTokenRepository(csrfTokenRepository())
	}

	@Bean
	CustomCsrfFilter customCsrfFilter() {
		new CustomCsrfFilter()
	}

	CsrfTokenRepository csrfTokenRepository() {
		def repository = new HttpSessionCsrfTokenRepository()
		repository.setHeaderName("X-XSRF-TOKEN")
		repository
	}
	
}