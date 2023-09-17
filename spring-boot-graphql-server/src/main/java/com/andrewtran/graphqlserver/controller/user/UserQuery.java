package com.andrewtran.graphqlserver.controller.user;

import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;

import com.andrewtran.graphqlserver.model.User;
import com.andrewtran.graphqlserver.service.UserService;

import java.util.List;
import java.util.UUID;

@Controller
public class UserQuery {

  @Autowired
	private UserService userService;
  
  @QueryMapping
	public List<User> allUsers() {
		return userService.getAllUsers();
	}

  @QueryMapping
	public User userById(@Argument UUID id) {
    return userService.getUserById(id);
  }

  @QueryMapping
	public User signIn(@Argument String email, @Argument String password) {
    return userService.signIn(email, password);
  }

  @QueryMapping
	public Integer totalUsers() {
    return (int) userService.countUsers();
  }
}
