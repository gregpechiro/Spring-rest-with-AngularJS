package com.cagnosolutions.datarest.entities.user

import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

/**
 * Created by greg on 2/12/15.
 */

@CompileStatic
@Service
class UserService {
	
	@Autowired
	UserRepository repo
	
	List<User> findAll() {
		repo.findAll()
	}
	
	User findOne(Integer id) {
		repo.findOne(id)
	}
	
	def save(User user) {
		repo.save(user)
	}
}
