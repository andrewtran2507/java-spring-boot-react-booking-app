package com.andrewtran.graphqlserver.model;

import java.util.UUID;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "email", nullable = false, unique = true, length = 45)
    private String email;

    @Column(name = "password", nullable = false, length = 64)
    private String password;

    @Column(name = "type", nullable = false, length = 1)
    private Integer type; // 1: clients | 2: Providers

    // Constructors, Getters, and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
      return password;
    }
  
    public void setPassword(String password) {
      this.password = password;
    }

    public Integer getType() {
      return type;
    }
  
    public void setType(Integer type) {
      this.type = type;
    }

    @Override
    public String toString() {
      return "User [id=" + id + ", name=" + name + ", email=" + email + ", type=" + type + "]";
    }
}