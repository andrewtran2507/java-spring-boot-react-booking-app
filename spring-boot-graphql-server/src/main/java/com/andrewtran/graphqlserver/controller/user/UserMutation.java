package com.andrewtran.graphqlserver.controller.user;


import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

import com.andrewtran.graphqlserver.model.User;
import com.andrewtran.graphqlserver.service.UserService;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;

import javassist.NotFoundException;
import java.util.UUID;

@Controller
public class UserMutation {
	
	@Autowired
	private UserService userService;

	@MutationMapping
	public User createUser(@Argument String name, @Argument String email, @Argument String password, @Argument Integer type) {
    return userService.createUser(name, email, password, type);
	}
	
	@MutationMapping	
	public User updateUser(@Argument UUID id, @Argument String name, @Argument String email, @Argument String password, @Argument Integer type) throws NotFoundException {
    User data = userService.updateUser(id, name, email, password, type);
    if (data.getEmail().equals(email)) {
      return data;
    }
		throw new NotFoundException("Not found User to update!");
	}
}
