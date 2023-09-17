package com.andrewtran.graphqlserver.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andrewtran.graphqlserver.repository.UserRepository;
import com.andrewtran.graphqlserver.utils.StringUtil;
import com.andrewtran.graphqlserver.model.User;

import java.util.List;
import java.util.UUID;
// import java.io.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StringUtil stringUtil;

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public User getUserById(UUID id) {
        User user = userRepository.getReferenceById(id);
        user.setPassword(";))");
        return user;
    }

    public Integer countUsers() {
        return (int) userRepository.count();
    }

    public User signIn(String email, String password) {
        User user = userRepository.getByEmail(email);
        if (user != null && user.getPassword().equals(stringUtil.getSha256hex(password))) {
            user.setPassword(";))");
            return user;
        }
        return null;
    }

    // Create a new user
    public User createUser(String name, String email, String password, Integer type) {
        User user = new User();
		user.setName(name);
		user.setEmail(email);
        user.setPassword(stringUtil.getSha256hex(password));
        user.setType(type);
        return userRepository.save(user);
    }

    // Update user
    public User updateUser(UUID id, String name, String email, String password, Integer type) {
        User existingUser = userRepository.getReferenceById(id);
        if (existingUser.getId() != null) {
            if (!existingUser.getName().equals(name)) {
                existingUser.setName(name);
            }
            if (!existingUser.getEmail().equals(email)) {
                existingUser.setEmail(email);
            }
            String newPassword = stringUtil.getSha256hex(password);
            if (!existingUser.getPassword().equals(newPassword)) {
                existingUser.setPassword(newPassword);
            }
            if (existingUser.getType() != type) {
                existingUser.setType(type);
            }
            return userRepository.save(existingUser);
        }
        return null;
    }

    // Delete all users
    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    // Delete user
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    // Other business logic related to users
}