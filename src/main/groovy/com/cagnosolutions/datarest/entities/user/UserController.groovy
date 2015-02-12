package com.cagnosolutions.datarest.entities.user
import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
/**
 * Created by greg on 2/12/15.
 */

@CompileStatic
@RestController
@RequestMapping("/user")
class UserController {
	
	@Autowired
	UserService userService
	
	@RequestMapping(method = RequestMethod.GET)
	List<User> findAllUsers() {
		userService.findAll()
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	User findOneUser(@PathVariable Integer id) {
		userService.findOne(id)
	}
	
	@RequestMapping(method = RequestMethod.POST)
	def addUser(User user) {
		userService.save(user)
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	def saveUser(User user) {
		userService.save(user)
	}
}
