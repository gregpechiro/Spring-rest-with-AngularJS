package com.cagnosolutions.datarest.util

import groovy.transform.CompileStatic
import org.springframework.security.web.csrf.CsrfToken
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by Scott Cagno.
 * Copyright Cagno Solutions. All rights reserved.
 */

@CompileStatic
class CustomCsrfFilter extends OncePerRequestFilter {

	void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		def token = request.getAttribute("_csrf") as CsrfToken
		if (token != null) {
			response.setHeader "X-CSRF-HEADER", token.headerName
			response.setHeader "X-CSRF-PARAM", token.parameterName
			response.setHeader "X-CSRF-TOKEN", token.token
		}
		filterChain.doFilter request, response
	}
}
