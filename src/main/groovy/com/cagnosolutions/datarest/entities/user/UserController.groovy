package com.cagnosolutions.datarest.entities.user
import groovy.transform.CompileStatic
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
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
	User addUser(@RequestBody User user) {
		userService.save(user)
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	User saveUser(@RequestBody User user) {
		userService.save(user)
	}
	
	@RequestMapping(value = "/new", method = RequestMethod.GET)
	User newUser() {
		new User()
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	def deleteUser(@PathVariable Integer id) {
		userService.delete(id)
	}
}
