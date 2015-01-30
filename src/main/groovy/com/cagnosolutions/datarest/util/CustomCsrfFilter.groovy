package com.cagnosolutions.datarest.util
import groovy.transform.CompileStatic
import org.springframework.security.web.csrf.CsrfToken
import org.springframework.web.filter.OncePerRequestFilter
import org.springframework.web.util.WebUtils

import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.Cookie
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
		/*def token = request.getAttribute("_csrf") as CsrfToken
		//def token = request.getHeader("X-XSRF-TOKEN") as CsrfToken
		if (token != null) {
			//response.setHeader "Set-Cookie", "XSRF-TOKEN=${token.token}; Path=/; HttpOnly"
			//response.setHeader "X-XSRF-HEADER", token.headerName
			//response.setHeader "X-XSRF-PARAM", token.parameterName
			//response.setHeader "X-XSRF-TOKEN", token.token
			
		}
		filterChain.doFilter request, response*/

		def csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName())
		if (csrf != null) {
			def cookie = WebUtils.getCookie(request, "XSRF-TOKEN")
			String token = csrf.getToken()
			if (cookie==null || token!=null && !token.equals(cookie.getValue())) {
				cookie = new Cookie("XSRF-TOKEN", token)
				cookie.setPath("/")
				response.addCookie(cookie)
			}
		}
		filterChain.doFilter(request, response)
		
		
	}
}
