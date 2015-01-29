package com.cagnosolutions.datarest.util

import groovy.transform.CompileStatic
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.web.DefaultRedirectStrategy
import org.springframework.security.web.RedirectStrategy
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

/**
 * Created by Scott Cagno.
 * Copyright Cagno Solutions. All rights reserved.
 */

@CompileStatic
class CustomAuthSuccess implements AuthenticationSuccessHandler {

	RedirectStrategy redirectStrategy = new DefaultRedirectStrategy()

	void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
								 Authentication authentication) throws IOException, ServletException {

		if (response.committed)
			return

		authentication.authorities.each { authority ->
			switch ((authority as GrantedAuthority).authority) {
				case "ROLE_USER":
					redirectStrategy.sendRedirect request, response, "/secure/user"
					break
				case "ROLE_ADMIN":
					redirectStrategy.sendRedirect request, response, "/secure/admin"
					break
			}
		}
	}
}
